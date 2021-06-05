import axios from 'axios';

export default function request(option) {
  return new Promise((resolve, reject) => {
  //1.创建aixos 的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //2.axios的拦截器    
  //2.1请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config);
    //1.比如config中的一些信息不符合服务器的要求
    //2.比如每次发送网路请求时，都希望在界面中显示一个请求图标
    //3.某些网络请求（比如登入(token)），必须携带一些特殊的信息
    
    return config
  },err => {
    // console.log(err);
    return err
  })

  //2.2响应拦截
  // instance.interceptors.response.use(res => {
  //   console.log(res);
  //   return res.data
  // },err => {
  //   console.log(err);
  // })

  //3.发送真的的网路请求
  instance.interceptors.response.use(response => {
			// console.log('来到了response拦截success中');
			return response.data
		}, err => {
			console.log('来到了response拦截failure中');
      console.log(err);
      if (err && err.response) {
				switch (err.response.status) {
					case 400:
						err.message = '请求错误'
						break
					case 401:
						err.message = '未授权的访问'
						break
				}
			}
			return err
		})

    // 2.传入对象进行网络请求
		instance(option).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}


//更换框架
// import android from 'android'

// export function request(config) {
//   android代码

//   return new Promise()
// }