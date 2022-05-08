import React, {useEffect} from 'react';

import styles from './index.less';
import {Avatar, Button, Card} from "antd";
import {LinkOutlined} from "@ant-design/icons";
import useAppLoginModel from "@/pages/user/AppLogin/model";
import {history} from "umi";

const AppLogin: React.FC = () => {
  const model = useAppLoginModel()
  const appid = history.location.query?.appid as string
  useEffect(() => {
    // get appid from query
    if (appid) {
      model.load(appid)
    }
  },[])
  return (
    <div className={styles.container}>
      {
        model.app && (
          <div className={styles.content}>
            <div className={styles.linkHeader}>
              <Avatar
                size={120}
                gap={10}
                className={styles.oauthAppIcon}
                icon={model.app.name.substring(0, 1).toUpperCase()}
              >
              </Avatar>
              <LinkOutlined size={120}/>
              <Avatar
                size={120}
                gap={100}
                className={styles.selfAppIcon}
                icon={"A"}
              >

              </Avatar>
            </div>
            <Card className={styles.card}>
              <div className={styles.cardHeader}>
                link to
                <div className={styles.appName}>
                  {model.app.name}
                </div>
              </div>
              <Button type={"primary"} className={styles.allowButton} onClick={() => model.allow(appid)}>
                Allow
              </Button>
            </Card>
          </div>
        )
      }
    </div>

  );
};

export default AppLogin;
