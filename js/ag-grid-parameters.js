export let columnDefinitions = [
    { field: "id", headerName: "Id", sortable: true, filter: true, resizable: true },
    { field: "name", headerName: "Name", sortable: true, filter: true, resizable: true },
    { field: "locale", headerName: "Locale", sortable: true, filter: true, hide: true, resizable: true },
    { field: "promoter", headerName: "Promoter", sortable: true, filter: true },
    { field: "startDate", headerName: "Start Date", sortable: true, filter: true },
    { field: "localTime", headerName: "Local Time", sortable: true, filter: true },
    { field: "timezone", headerName: "Time Zone", sortable: true, filter: true },
];

export let gridColumnsHiddenStates;