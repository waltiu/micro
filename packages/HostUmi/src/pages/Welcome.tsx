import React,{lazy,Suspense} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';
import styles from './Welcome.less';
const RemoteUmi =lazy(()=>import("@RemoteUmi/index"))
import routers from '@RemoteUmi/remote';
console.log(routers,'routers')
const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Suspense  fallback="loading">
          <RemoteUmi/>
        </Suspense>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
