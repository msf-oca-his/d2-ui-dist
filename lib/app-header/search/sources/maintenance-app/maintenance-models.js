'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSideBarConfig = getSideBarConfig;
exports.getSectionForType = getSectionForType;
function getSideBarConfig() {
    return {
        all: {
            items: []
        },
        dataElementSection: {
            items: ['categoryOption', 'category', 'categoryCombo', 'categoryOptionCombo', 'categoryOptionGroup', 'categoryOptionGroupSet', 'dataElement', 'dataElementGroup', 'dataElementGroupSet']
        },
        dataSetSection: {
            items: ['dataSet']
        },
        indicatorSection: {
            items: ['indicator', 'indicatorType', 'indicatorGroup', 'indicatorGroupSet']
        },

        organisationUnitSection: {
            items: ['organisationUnit', 'organisationUnitGroup', 'organisationUnitGroupSet', 'organisationUnitLevel']
        },

        trackerSection: {
            items: ['trackedEntityAttribute', 'trackedEntityAttributeGroup', 'relationshipType', 'trackedEntity']
        },

        otherSection: {
            items: ['constant', 'attribute', 'optionSet', 'legendSet', 'predictor', 'pushAnalysis', 'externalMapLayer']
        }
    };
}

function getSectionForType(modelType) {
    var config = getSideBarConfig();

    return Object.keys(config).find(function (section) {
        return config[section] && config[section].items && config[section].items.indexOf(modelType) >= 0;
    });
}

exports.default = {
    getSideBarConfig: getSideBarConfig
};