// @ts-ignore
/* eslint-disable */
import {request} from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  const token = localStorage.getItem('token');
  return request<API.CurrentUserResult>('/api/auth/current', {
    method: 'GET',
    ...(options || {
      params: {
        token
      }
    }),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  localStorage.removeItem('token');
  // return request<Record<string, any>>('/api/login/outLogin', {
  //   method: 'POST',
  //   ...(options || {}),
  // });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/user/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getAppList({page = 1, pageSize = 20}: { page: number, pageSize: number }) {
  return request<API.GetAppListResult>('/api/apps', {
    method: 'GET',
    params: {
      page,
      pageSize
    }
  });
}

export async function createApp(name: string) {
  return request<API.BaseResult<undefined>>('/api/apps', {
    method: 'POST',
    data: {
      name,
      callback: ""
    }
  });
}

export async function deleteAppByAppId(appId: string) {
  return request<API.BaseResult<undefined>>(`/api/app/${appId}`, {
    method: 'DELETE',
  });
}

export async function getMyTokenList({page = 1, pageSize = 20}: { page: number, pageSize: number }) {
  return request<API.GetMyTokenListResult>('/api/my/tokens', {
    method: 'GET',
    params: {
      page,
      pageSize
    }
  });
}

export async function changeMyPassword(oldPassword: string, newPassword: string) {
  return request<API.BaseResult<undefined>>('/api/my/password', {
    method: 'POST',
    data: {
      oldPassword,
      newPassword
    }
  });
}

export async function registerUser(username: string, password: string) {
  return request<API.BaseResult<undefined>>('/api/users/register', {
    method: 'POST',
    data: {
      username,
      password
    }
  });
}

export async function getLoginApp(appId: string) {
  return request<API.BaseResult<API.App>>(`/api/oauth/app`, {
    method: 'GET',
    params: {
      appid: appId
    }
  });
}

export async function generateAuthCode(appid: string) {
  console.log(appid)
  return request<API.BaseResult<API.GenerateAuthCodeResult>>(`/api/oauth/authcode`, {
    method: 'POST',
    params: {
      appid
    }
  })
}
