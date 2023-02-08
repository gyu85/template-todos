import { createGlobalStyle } from 'styled-components';
import spoqaHanSansNeo from './fonts';

const GlobalStyle = createGlobalStyle`
${spoqaHanSansNeo}
  body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,textarea,p,blockquote,th,td,input,select,textarea,button {margin:0;padding:0}
  fieldset,img {border:0 none}
  dl,ul,ol,menu,li {list-style:none}
  input,select,textarea,button {vertical-align:middle}
  button {border:0 none;background-color:transparent;cursor:pointer}
  table{border-collapse:collapse;border-spacing:0}
  body {background:#fff}
  body,th,td,input,select,textarea,button {font-size:14px;line-height:1.5;font-family:'Spoqa Han Sans Neo', 'Apple SD Gothic Neo','돋움',Helvetica,sans-serif;color:#43425D}
  a {color:#43425D;text-decoration:none}
  a:active, a:hover {text-decoration:underline}
  address, caption, em {font-style:normal;font-weight:normal}  

  .blind {overflow:hidden;position:absolute;width:0;height:0;line-height:0;text-indent:-9999px}

  body { background-color: #625B71 }
  #root {max-width: 1440px;padding: 56px 16px 40px;margin: 0 auto;box-sizing: border-box;}
`;

export default GlobalStyle;
