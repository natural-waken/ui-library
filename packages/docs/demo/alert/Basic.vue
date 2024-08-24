<template>
    <h2>通过 slot 传入内容</h2>
    <div style="max-width: 600px">
        <li-alert type="success">Success alert</li-alert>
        <li-alert type="info">Info alert</li-alert>
        <li-alert type="warning">Warning alert</li-alert>
        <li-alert type="danger">Error alert</li-alert>
    </div>
    <h2>通过 prop 传入内容</h2>
    <div style="max-width: 600px">
        <li-alert type="success" title="Success alert" />
        <li-alert type="info" title="Info alert" />
        <li-alert type="warning" title="Warning alert" />
        <li-alert type="danger" title="Error alert" />
    </div>
</template>
