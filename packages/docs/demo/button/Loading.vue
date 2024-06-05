<template>
  <div>
    <li-button type="primary" loading>Loading</li-button>
    <li-button type="primary" loading-icon="circle-notch" loading
      >Loading</li-button
    >
    <li-button type="primary" loading>
      <template #loading>
        <li-icon style="margin-right: 6px" icon="star" spin />
      </template>
      Loading
    </li-button>
  </div>
</template>
