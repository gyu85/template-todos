import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,textarea,p,blockquote,th,td,input,select,textarea,button {margin:0;padding:0}
  fieldset,img {border:0 none}
  dl,ul,ol,menu,li {list-style:none}
  input,select,textarea,button {font-size:100%;vertical-align:middle}
  button {border:0 none;background-color:transparent;cursor:pointer}
  table{border-collapse:collapse;border-spacing:0}
  body {background:#fff}
  body,th,td,input,select,textarea,button {font-size:14px;line-height:1.5;font-family:'Spoqa Han Sans Neo', 'Apple SD Gothic Neo','돋움',Helvetica,sans-serif;color:#43425D}
  a {color:#43425D;text-decoration:none}
  a:active, a:hover {text-decoration:underline}
  address, caption, em {font-style:normal;font-weight:normal}
  input[type='text'],input[type='password'],input[type='submit'],input[type='search']{-webkit-appearance:none; border-radius:0}
  input:checked[type='checkbox'] {background-color:#666; -webkit-appearance:checkbox}
  button,input[type='button'],input[type='submit'],input[type='reset'],input[type='file'] {-webkit-appearance:button; border-radius:0}
  input[type='search']::-webkit-search-cancel-button {-webkit-appearance:none}
  
  .blind {overflow:hidden;position:absolute;width:0;height:0;line-height:0;text-indent:-9999px}
`;

export default GlobalStyle;
