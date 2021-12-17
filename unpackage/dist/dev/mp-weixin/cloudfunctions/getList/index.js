// 云函数入口文件
const cloud = require('wx-server-sdk')
const sdk = require('@baiducloud/sdk')
cloud.init()
const db = cloud.database()
const collection = db.collection('skin_texture')
// 云函数入口函数
exports.main = async (event, context) => {
  return new Promise((resolve, reject) => {
    let category_list = []
    let _id = ''
    collection.get().then(record_json => {
      const timestamp = Date.now() - 5 * 60 * 1000
      if (record_json.data.length == 0 || record_json.data[0].time < timestamp) {
        // 需要重新加载
        if (record_json.data.length != 0) {
          _id = record_json.data[0]._id
        }
        const BosClient = sdk.BosClient
        const config = {
          credentials: {
            ak: '6a44e25988404dadb5a8f630f13a4ee8',
            sk: 'a6f01554960e441397ccbf0bf5089135'
          },
          endpoint: 'https://bj.bcebos.com'
        }
        let client = new BosClient(config)
        const bucketName = 'skin-texture'
        const cdn_url_header = 'https://skin-texture.cdn.bcebos.com/'
        const options = {
          delimiter: '/',
          // prefix: '新潮/'
        }
        let getCategoryInfo = new Promise((resolve, reject) => {
          client.listObjects(bucketName, options).then(function (response) {
            let contents = response.body.commonPrefixes
            contents.forEach(element => {
              let prefix = element.prefix
              let dir_name = prefix.replace('/', '')
              let pictures = {
                title: dir_name
              }
              category_list.push(pictures)
            });
            resolve()
          }).catch(function (error) {
            console.error(error)
          })
        }).then(() => {
          let count = 0
          category_list.forEach(category => {
            let pic_options = {
              prefix: category.title + '/'
            }
            let getCategoryPics = new Promise((resolve, reject) => {
              client.listObjects(bucketName, pic_options).then(function (rsp) {
                let pics = rsp.body.contents
                for (let index = 0; index < pics.length; index++) {
                  const pic = pics[index]
                  if (index == 0) {
                    category.url = cdn_url_header + pic.key
                    category.children = []
                  }
                  let picInfo = {
                    title: pic.key,
                    url: cdn_url_header + pic.key
                  }
                  category.children.push(picInfo)
                }
                count++
                resolve()
              }).catch((err) => {
                console.error(err)
              })
            }).then(() => {
              if (count == category_list.length) {
                // 全部遍历完成，开始写入数据库
                let save_db = new Promise((resolve, reject) => {
                  // console.log(category_list)
                  if (_id == '') {
                    collection.add({
                      data: {
                        time: Date.now(),
                        data: category_list
                      }
                    }).then(() => {
                      resolve(category_list)
                    })
                  } else {
                    collection.doc(_id).update({
                      data: {
                        time: Date.now(),
                        data: category_list
                      }
                    }).then(() => {
                      resolve(category_list)
                    })
                  }
                }).then((category_list) => {
                  resolve(category_list)
                })
              }
            })
          })
        })
      } else {
        resolve(record_json.data[0].data)
      }
    })
  }).then(category_list => {
    return {
      ajaxList: category_list
    }
  })
}