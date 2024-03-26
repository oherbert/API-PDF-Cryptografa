export default interface IConfig {
  server: { port: number, cleanerInterval: number };
  auth: {
    authURL: string;
  };
  database: {
    user: string;
    password: string;
    connectString: string;
  };
  request: {
    baseUrl: string;
  };
  oracleClient: string;
  uploadFolder: string;
  uploadFolderName: string;
  testFileDownload: string;
}