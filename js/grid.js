import { ApiCallService } from "./api-call-service.js";
import { columnDefinitions, gridColumnsHiddenStates } from "./ag-grid-parameters.js";

export function initialGrid(url) {
    initialGridColumnsHiddenStates();
    callApiAndSetResultsToGrid(url);
    updateHiddenColumnsPanel();

    $(document).on('click', '.closebtn', function () {
        AddFromHiddenColumnPanelToGrid($(this).parents("div").attr("id"));
    });

    $(document).on('click', '#clear-search-form', function (event) {
        event.preventDefault();
        $('#search-form').trigger("reset");
        $("select").val('').trigger('change');
    });

    $("#search-form").submit(function (event) {
        event.preventDefault();
        let form_data = $(this).serialize();
        let queryString = form_data.replace(/[^&]+=\.?(?:&|$)/g, '');;
        callApiAndSetResultsToGrid(url, queryString);
    });

    $('select').select2({
        placeholder: "Select Source",
    });
}

export function assignGridEventsToGridContentElement() {
    document.addEventListener('DOMContentLoaded', function () {
        let gridElementContent = document.querySelector('#grid-content');
        new agGrid.Grid(gridElementContent, gridOptionsConfigurations);
    });
}

function initialGridColumnsHiddenStates() {
    gridColumnsHiddenStates = columnDefinitions.map(col => ({ 'colId': col.field, 'hide': col.hide }));
}

function updateHiddenColumnsPanel() {
    EmptyHiddenColumnsPanel();

    let hiddenColumnsList = gridColumnsHiddenStates.filter(b => b.hide === true);

    AddColumnsElementsToHiddenColumnsPanel(hiddenColumnsList);
}

function AddColumnsElementsToHiddenColumnsPanel(hiddenColumnsList) {
    for (let i = 0; i < hiddenColumnsList.length; i++) {
        let hiddenColumnFullItems = columnDefinitions.filter(a => a.field === hiddenColumnsList[i].colId)[0];
        let hiddenColumnName = hiddenColumnFullItems.headerName;
        let hiddenColumnElement = createOneHiddenColumnElement(hiddenColumnsList[i].colId, hiddenColumnName);

        $(".hidden-items").append(hiddenColumnElement);
    }
}

function createOneHiddenColumnElement(hiddenColumnId, hiddenColumnName) {
    let element = $('<div/>');

    element.attr('id', hiddenColumnId);
    element.addClass('chip');
    element.append(hiddenColumnName + "<span class='glyphicon glyphicon-plus closebtn'></span>");

    return element;
}

function EmptyHiddenColumnsPanel() {
    $('.hidden-items').empty();
}

function AddFromHiddenColumnPanelToGrid(hiddenColumnId) {
    let hiddenColumnGridIndex = gridColumnsHiddenStates.findIndex(a => a.colId === hiddenColumnId);
    gridColumnsHiddenStates[hiddenColumnGridIndex].hide = false;

    setGridColumnStateAndUpdateContent();

    $('#' + hiddenColumnId).remove();
}

function setGridColumnStateAndUpdateContent() {
    gridOptionsConfigurations.columnApi.setColumnState(gridColumnsHiddenStates);
    gridOptionsConfigurations.api.refreshCells();
}

function callApiAndSetResultsToGrid(url, queryString = '') {
    let alertElement = $('.events .alert-danger');
    let apiCallService = new ApiCallService()

    apiCallService.getApi(url, queryString)
        .then(
            function(result) {
                let events = result._embedded != null ? result._embedded.events : [];
                let gridNewContent = mapNewDataToGridRows(events);
                gridOptionsConfigurations.api.setRowData(gridNewContent);
                alertElement.hide();
            },
            function(error) {
                alertElement.html('<strong>Error!</strong> ' + error);
                alertElement.show();
            }
        );
}

function mapNewDataToGridRows(events) {
    return events.map(e => ({
        'id': e.id,
        'name': e.name,
        'locale': e.locale,
        'promoter': e.promoter == null ? '' : e.promoter.name,
        'startDate': e.dates == null ? '' : e.dates.start.localDate,
        'localTime': e.dates == null ? '' : e.dates.start.localTime,
        'timezone': e.dates == null ? '' : e.dates.timezone
    }));
}

let gridOptionsConfigurations = {
    columnDefs: columnDefinitions,
    pagination: true,
    paginationPageSize: 10,
    onDragStopped(e) {
        gridColumnsHiddenStates = e.columnApi.getColumnState();
        updateHiddenColumnsPanel();
    }
};
