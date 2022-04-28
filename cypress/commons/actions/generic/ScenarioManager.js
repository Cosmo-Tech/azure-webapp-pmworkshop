// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { GENERIC_SELECTORS } from '../../constants/generic/IdConstants';

function switchToScenarioManager() {
  cy.get(GENERIC_SELECTORS.scenario.manager.tabName).click();
}

function deleteScenario(scenarioName) {
  writeInFilter(scenarioName);
  cy.get(GENERIC_SELECTORS.scenario.manager.button.delete).click();
  cy.get(GENERIC_SELECTORS.scenario.manager.confirmDeleteDialog).contains('button', 'Confirm').click();
}

function writeInFilter(searchStr) {
  cy.get(GENERIC_SELECTORS.scenario.manager.search).find('input').clear().type(searchStr);
}

function getScenarioAccordion(scenarioId) {
  return cy.get(GENERIC_SELECTORS.scenario.manager.scenarioAccordion.replace('$SCENARIOID', scenarioId));
}

function getScenarioValidationStatusChip(scenarioId) {
  return getScenarioAccordion(scenarioId).find(GENERIC_SELECTORS.scenario.validationStatusChip);
}

function getScenarioValidationStatusLoadingSpinner(scenarioId) {
  return getScenarioAccordion(scenarioId).find(GENERIC_SELECTORS.scenario.validationStatusLoadingSpinner);
}

// This function expects the scenario card to be visible, and does not trigger the expanded / collapsed state of the
// scenari ocard. To check both validatin status in a single function clal, use checkValidationStatus
function _checkValidationStatusOnceUnsafe(scenarioId, expectedStatus) {
  switch (expectedStatus) {
    case 'Draft':
    case 'Unknown':
      getScenarioValidationStatusChip(scenarioId).should('not.exist');
      getScenarioValidationStatusLoadingSpinner(scenarioId).should('not.exist');
      break;
    case 'Validated':
      getScenarioValidationStatusChip(scenarioId).should('be.visible');
      getScenarioValidationStatusChip(scenarioId).should('have.text', 'Validated');
      getScenarioValidationStatusLoadingSpinner(scenarioId).should('not.exist');
      break;
    case 'Rejected':
      getScenarioValidationStatusChip(scenarioId).should('be.visible');
      getScenarioValidationStatusChip(scenarioId).should('have.text', 'Rejected');
      getScenarioValidationStatusLoadingSpinner(scenarioId).should('not.exist');
      break;
    case 'Loading':
      getScenarioValidationStatusChip(scenarioId).should('not.exist');
      getScenarioValidationStatusLoadingSpinner(scenarioId).should('be.visible');
      break;
    default:
      throw new Error(
        `Unknown expected scenario status "${expectedStatus}". Please use one of ` +
          'Draft, Unknown, Loading, Validated, Rejected.'
      );
  }
}

function checkValidationStatus(searchStr, scenarioId, expectedStatus) {
  writeInFilter(searchStr);
  _checkValidationStatusOnceUnsafe(scenarioId, expectedStatus);
  triggerScenarioAccordionExpandOrCollapse(scenarioId);
  _checkValidationStatusOnceUnsafe(scenarioId, expectedStatus);
  writeInFilter('{esc}');
}

function getScenarioAccordionExpandButton(scenarioId) {
  return getScenarioAccordion(scenarioId).find(GENERIC_SELECTORS.scenario.manager.scenarioAccordionExpandButton);
}

function triggerScenarioAccordionExpandOrCollapse(scenarioId) {
  return getScenarioAccordionExpandButton(scenarioId).click();
}

export const ScenarioManager = {
  switchToScenarioManager,
  deleteScenario,
  writeInFilter,
  getScenarioAccordion,
  getScenarioValidationStatusChip,
  getScenarioValidationStatusLoadingSpinner,
  checkValidationStatus,
  getScenarioAccordionExpandButton,
  triggerScenarioAccordionExpandOrCollapse,
};
