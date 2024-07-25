<template>
    <li-popconfirm
        width="220"
        confirm-button-text="Delete"
        cancel-button-text="No,Thanks"
        icon="trash"
        icon-color="#626aef"
        title="Are you sure to delete this item?"
        @confirm="$message.success('Delete Success')"
        @cancel="$message.info('Cancel')"
    >
        <li-button>Delete</li-button>
    </li-popconfirm>
</template>
