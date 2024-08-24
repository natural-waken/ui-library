<template>
    <div class="tooltip-base-box">
        <div class="row center">
            <!-- 使用 LiTooltip 组件，并设置触发方式为 contextmenu（右键菜单） -->
            <li-tooltip
                class="box-item"
                content="Right-click to see tooltip"
                placement="top"
                trigger="contextmenu"
            >
                <li-button>Right-click me</li-button>
            </li-tooltip>
        </div>
    </div>
</template>

<style>
.tooltip-base-box {
    width: 600px;
}
.tooltip-base-box .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.tooltip-base-box .center {
    justify-content: center;
}
.tooltip-base-box .box-item {
    width: 110px;
    margin-top: 10px;
}
</style>
