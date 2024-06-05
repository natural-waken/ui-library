import { makeInstaller } from "@ui-library/utils";
import components from "./components";
import '@ui-library/theme/index.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import printLogo from "./printLogo";

// 引入我们的 logo
printLogo();

library.add(fas);  // 将图标引进来

const installer = makeInstaller(components);

// export * from '../components';  // 这个肯定要这样写  不然在线上无法看见
export * from '@ui-library/components';  // 新方法
export default installer
