import { makeInstaller } from "@ui-library/utils";
import components from "./components";
import '@ui-library/theme/index.css'

const installer = makeInstaller(components);

export * from '@ui-library/components';
export default installer