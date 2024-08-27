<template>
    <div class="tooltip-base-box">
        <div class="row center">
            <li-tooltip
                class="box-item"
                content="Top Left prompts info"
                placement="top-start"
            >
                <li-button>top-start</li-button>
            </li-tooltip>
            <li-tooltip
                class="box-item"
                content="Top Center prompts info"
                placement="top"
            >
                <li-button>top</li-button>
            </li-tooltip>
            <li-tooltip
                class="box-item"
                content="Top Right prompts info"
                placement="top-end"
            >
                <li-button>top-end</li-button>
            </li-tooltip>
        </div>
        <div class="row">
            <li-tooltip
                class="box-item"
                content="Left Top prompts info"
                placement="left-start"
            >
                <li-button>left-start</li-button>
            </li-tooltip>
            <li-tooltip
                class="box-item"
                content="Right Top prompts info"
                placement="right-start"
            >
                <li-button>right-start</li-button>
            </li-tooltip>
        </div>
        <div class="row">
            <li-tooltip
                class="box-item"
                content="Left Center prompts info"
                placement="left"
            >
                <li-button class="mt-3 mb-3">left</li-button>
            </li-tooltip>
            <li-tooltip
                class="box-item"
                content="Right Center prompts info"
                placement="right"
            >
                <li-button>right</li-button>
            </li-tooltip>
        </div>
        <div class="row">
            <li-tooltip
                class="box-item"
                content="Left Bottom prompts info"
                placement="left-end"
            >
                <li-button>left-end</li-button>
            </li-tooltip>
            <li-tooltip
                class="box-item"
                content="Right Bottom prompts info"
                placement="right-end"
            >
                <li-button>right-end</li-button>
            </li-tooltip>
        </div>
        <div class="row center">
            <li-tooltip
                class="box-item"
                content="Bottom Left prompts info"
                placement="bottom-start"
            >
                <li-button>bottom-start</li-button>
            </li-tooltip>
            <li-tooltip
                class="box-item"
                content="Bottom Center prompts info"
                placement="bottom"
            >
                <li-button>bottom</li-button>
            </li-tooltip>
            <li-tooltip
                class="box-item"
                content="Bottom Right prompts info"
                placement="bottom-end"
            >
                <li-button>bottom-end</li-button>
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
