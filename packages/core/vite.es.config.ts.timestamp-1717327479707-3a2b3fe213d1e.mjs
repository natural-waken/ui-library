// vite.es.config.ts
import { defineConfig } from "file:///D:/UI%20Library/ui-library/node_modules/.pnpm/vite@5.2.11_@types+node@20.12.12_sass@1.77.2/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import vue from "file:///D:/UI%20Library/ui-library/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.11_@types+node@20.12.12_sass@1.77.2__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///D:/UI%20Library/ui-library/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.12.12_rollup@4.17.2_typescript@5.4.5_vite@5.2.11_@types+node@20.12.12_sass@1.77.2_/node_modules/vite-plugin-dts/dist/index.mjs";
import { readdirSync } from "fs";
import { filter, map } from "file:///D:/UI%20Library/ui-library/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
var __vite_injected_original_dirname = "D:\\UI Library\\ui-library\\packages\\core";
function getDirectoriesSync(basePath) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
var vite_es_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types"
      // 输出路径  类型文件
    })
  ],
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./index.ts"),
      name: "UiLibrary",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator"
      ],
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") {
            return "index.css";
          }
          return chunkInfo.name;
        },
        // 分包相关
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (id.includes("/packages/utils") || id.includes("plugin-vue:export-helper")) {
            return "utils";
          }
          for (const item of getDirectoriesSync("../components")) {
            if (id.includes(`/packages/components/${item}`)) {
              return item;
            }
          }
        }
      }
    }
  }
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5lcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxVSSBMaWJyYXJ5XFxcXHVpLWxpYnJhcnlcXFxccGFja2FnZXNcXFxcY29yZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVUkgTGlicmFyeVxcXFx1aS1saWJyYXJ5XFxcXHBhY2thZ2VzXFxcXGNvcmVcXFxcdml0ZS5lcy5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1VJJTIwTGlicmFyeS91aS1saWJyYXJ5L3BhY2thZ2VzL2NvcmUvdml0ZS5lcy5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xyXG5pbXBvcnQgeyByZWFkZGlyU3luYyB9IGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gXCJsb2Rhc2gtZXNcIjtcclxuXHJcbi8vIFx1NjIxMVx1NEVFQ1x1NUMwNlx1NjI0MFx1NjcwOVx1N0VDNFx1NEVGNlx1NUI5QVx1NEU0OVx1NjIxMFx1NEUyQVx1NjU3MFx1N0VDNFxyXG5jb25zdCBDT01QX05BTUVTID0gW1xyXG4gICAgXCJBbGVydFwiLFxyXG4gICAgXCJCdXR0b25cIixcclxuICAgIFwiQ29sbGFwc2VcIixcclxuICAgIFwiRHJvcGRvd25cIixcclxuICAgIFwiRm9ybVwiLFxyXG4gICAgXCJJY29uXCIsXHJcbiAgICBcIklucHV0XCIsXHJcbiAgICBcIkxvYWRpbmdcIixcclxuICAgIFwiTWVzc2FnZVwiLFxyXG4gICAgXCJNZXNzYWdlQm94XCIsXHJcbiAgICBcIk5vdGlmaWNhdGlvblwiLFxyXG4gICAgXCJPdmVybGF5XCIsXHJcbiAgICBcIlBvcGNvbmZpcm1cIixcclxuICAgIFwiU2VsZWN0XCIsXHJcbiAgICBcIlN3aXRjaFwiLFxyXG4gICAgXCJUb29sdGlwXCIsXHJcbiAgICBcIlVwbG9hZFwiXHJcbl0gYXMgY29uc3Q7XHJcblxyXG5mdW5jdGlvbiBnZXREaXJlY3Rvcmllc1N5bmMoYmFzZVBhdGg6IHN0cmluZykge1xyXG4gICAgY29uc3QgZW50cmllcyA9IHJlYWRkaXJTeW5jKGJhc2VQYXRoLCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSk7XHJcblxyXG4gICAgcmV0dXJuIG1hcChcclxuICAgICAgICBmaWx0ZXIoZW50cmllcywgKGVudHJ5KSA9PiBlbnRyeS5pc0RpcmVjdG9yeSgpKSxcclxuICAgICAgICAoZW50cnkpID0+IGVudHJ5Lm5hbWVcclxuICAgICk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHZ1ZSgpLFxyXG4gICAgICAgIGR0cyh7XHJcbiAgICAgICAgICAgIHRzY29uZmlnUGF0aDogXCIuLi8uLi90c2NvbmZpZy5idWlsZC5qc29uXCIsXHJcbiAgICAgICAgICAgIG91dERpcjogXCJkaXN0L3R5cGVzXCIsICAvLyBcdThGOTNcdTUxRkFcdThERUZcdTVGODQgIFx1N0M3Qlx1NTc4Qlx1NjU4N1x1NEVGNlxyXG4gICAgICAgIH0pXHJcbiAgICBdLFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgICBvdXREaXI6IFwiZGlzdC9lc1wiLFxyXG4gICAgICAgIGxpYjoge1xyXG4gICAgICAgICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9pbmRleC50c1wiKSxcclxuICAgICAgICAgICAgbmFtZTogXCJVaUxpYnJhcnlcIixcclxuICAgICAgICAgICAgZmlsZU5hbWU6IFwiaW5kZXhcIixcclxuICAgICAgICAgICAgZm9ybWF0czogW1wiZXNcIl0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGV4dGVybmFsOiBbXHJcbiAgICAgICAgICAgICAgICBcInZ1ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmVcIixcclxuICAgICAgICAgICAgICAgIFwiQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zXCIsXHJcbiAgICAgICAgICAgICAgICBcIkBmb3J0YXdlc29tZS92dWUtZm9udGF3ZXNvbWVcIixcclxuICAgICAgICAgICAgICAgIFwiQHBvcHBlcmpzL2NvcmVcIixcclxuICAgICAgICAgICAgICAgIFwiYXN5bmMtdmFsaWRhdG9yXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChjaHVua0luZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBcdTk3MDBcdTg5ODFcdTVDMDYgc3R5bGUuY3NzIFx1NjUzOVx1NTQwRFx1NEUzQSBpbmRleC5jc3NcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2h1bmtJbmZvLm5hbWUgPT09IFwic3R5bGUuY3NzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiaW5kZXguY3NzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjaHVua0luZm8ubmFtZSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFx1NTIwNlx1NTMwNVx1NzZGOFx1NTE3M1xyXG4gICAgICAgICAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gXHU1OTgyXHU2NzlDXHU1MzA1XHU1NDJCXHU4RkQ5XHU0RTJBICBcdThCRjRcdTY2MEVcdTY2MkZcdTdCMkNcdTRFMDlcdTY1QjlcdTVFOTNcdTVGMTVcdTUxNjUgIFx1NUMzMVx1NTQ3RFx1NTQwRFx1NTIzMCB2ZW5kb3IgXHU1MjA2XHU1MzA1XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwibm9kZV9tb2R1bGVzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInZlbmRvclwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCIvcGFja2FnZXMvaG9va3NcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiaG9va3NcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZC5pbmNsdWRlcyhcIi9wYWNrYWdlcy91dGlsc1wiKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZC5pbmNsdWRlcyhcInBsdWdpbi12dWU6ZXhwb3J0LWhlbHBlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ1dGlsc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBnZXREaXJlY3Rvcmllc1N5bmMoXCIuLi9jb21wb25lbnRzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gXHU5MDREXHU1Mzg2XHU2MjQwXHU2NzA5XHU3RUM0XHU0RUY2XHU1NDBEXHU1QjU3ICAgXHU1M0NBXHU5MEEzXHU0RTJBXHU2QkNGXHU0RTJBXHU3RUM0XHU0RUY2XHU1MjA2XHU1MzA1XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGdldERpcmVjdG9yaWVzU3luYyhcIi4uL2NvbXBvbmVudHNcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKGAvcGFja2FnZXMvY29tcG9uZW50cy8ke2l0ZW19YCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFzVCxTQUFTLG9CQUFvQjtBQUNuVixTQUFTLGVBQWU7QUFDeEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sU0FBUztBQUNoQixTQUFTLG1CQUFtQjtBQUM1QixTQUFTLFFBQVEsV0FBVztBQUw1QixJQUFNLG1DQUFtQztBQTRCekMsU0FBUyxtQkFBbUIsVUFBa0I7QUFDMUMsUUFBTSxVQUFVLFlBQVksVUFBVSxFQUFFLGVBQWUsS0FBSyxDQUFDO0FBRTdELFNBQU87QUFBQSxJQUNILE9BQU8sU0FBUyxDQUFDLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFBQSxJQUM5QyxDQUFDLFVBQVUsTUFBTTtBQUFBLEVBQ3JCO0FBQ0o7QUFHQSxJQUFPLHlCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsTUFDQSxjQUFjO0FBQUEsTUFDZCxRQUFRO0FBQUE7QUFBQSxJQUNaLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUEsTUFDRCxPQUFPLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQ3RDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDbEI7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNYLFVBQVU7QUFBQSxRQUNOO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNKO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDSixnQkFBZ0IsQ0FBQyxjQUFjO0FBRTNCLGNBQUksVUFBVSxTQUFTLGFBQWE7QUFDaEMsbUJBQU87QUFBQSxVQUNYO0FBQ0EsaUJBQU8sVUFBVTtBQUFBLFFBQ3JCO0FBQUE7QUFBQSxRQUdBLGFBQWEsSUFBSTtBQUViLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUM3QixtQkFBTztBQUFBLFVBQ1g7QUFDQSxjQUFJLEdBQUcsU0FBUyxpQkFBaUIsR0FBRztBQUNoQyxtQkFBTztBQUFBLFVBQ1g7QUFDQSxjQUNJLEdBQUcsU0FBUyxpQkFBaUIsS0FDN0IsR0FBRyxTQUFTLDBCQUEwQixHQUN4QztBQUNFLG1CQUFPO0FBQUEsVUFDWDtBQUdBLHFCQUFXLFFBQVEsbUJBQW1CLGVBQWUsR0FBRztBQUNwRCxnQkFBSSxHQUFHLFNBQVMsd0JBQXdCLElBQUksRUFBRSxHQUFHO0FBQzdDLHFCQUFPO0FBQUEsWUFDWDtBQUFBLFVBQ0o7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
