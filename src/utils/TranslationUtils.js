// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { i18next, I18N_NAMESPACE } from '../services/config/i18next';

const getParameterTranslationKey = (parameterId) => {
  return `solution.parameters.${parameterId}.name`;
};

const getParameterTooltipTranslationKey = (parameterId) => {
  return `solution.parameters.${parameterId}.tooltip`;
};

const getParameterEnumValueTooltipTranslationKey = (parameterId, valueKey) => {
  return `solution.parameters.${parameterId}.enum.value.${valueKey}.tooltip`;
};

const getParametersGroupTranslationKey = (groupId) => {
  return `solution.parametersGroups.${groupId}.name`;
};

const addTranslationParametersGroupsLabels = (parametersGroups) => {
  const resources = {};
  for (const parametersGroup of parametersGroups) {
    for (const lang in parametersGroup.labels) {
      resources[lang] = resources[lang] || {};
      const key = getParametersGroupTranslationKey(parametersGroup.id);
      const label = parametersGroup.labels[lang];
      resources[lang][key] = label;
    }
  }
  const langs = Object.keys(resources);
  for (const lang of langs) {
    i18next.addResources(lang, I18N_NAMESPACE, resources[lang]);
  }
  i18next.reloadResources(langs);
};

const addTranslationParametersLabels = (parameters) => {
  const resources = {};
  for (const parameter of parameters) {
    for (const lang in parameter.labels) {
      resources[lang] = resources[lang] || {};
      const key = getParameterTranslationKey(parameter.id);
      resources[lang][key] = parameter.labels[lang];
    }
    for (const lang in parameter?.options?.tooltipText) {
      resources[lang] = resources[lang] || {};
      const key = getParameterTooltipTranslationKey(parameter.id);
      resources[lang][key] = parameter.options.tooltipText[lang];
    }
    for (const enumValue of parameter?.options?.enumValues ?? []) {
      for (const lang in enumValue.tooltipText) {
        resources[lang] = resources[lang] || {};
        const key = getParameterEnumValueTooltipTranslationKey(parameter.id, enumValue.key);
        resources[lang][key] = enumValue.tooltipText?.[lang];
      }
    }
  }
  const langs = Object.keys(resources);
  for (const lang of langs) {
    i18next.addResources(lang, I18N_NAMESPACE, resources[lang]);
  }
  i18next.reloadResources(langs);
};

const changeLanguage = (language, i18next) => {
  switch (language) {
    case 'en':
      i18next.changeLanguage('en');
      break;
    case 'fr':
      i18next.changeLanguage('fr');
      break;
    default:
      i18next.changeLanguage('en');
      break;
  }
};

const charactersToEscapeMapping = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
};
const symbolsToDecodeMapping = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#x2F;': '/',
};

const getStringWithEscapedCharacters = (data) => {
  if (typeof data === 'string') {
    return data.replace(/[&<>"'/]/g, (s) => charactersToEscapeMapping[s]);
  }
};

const getStringWithUnescapedCharacters = (string) => {
  let unescapedString = string;
  Object.keys(symbolsToDecodeMapping).forEach((key) => {
    const regex = new RegExp(key, 'g');
    unescapedString = unescapedString.replace(regex, symbolsToDecodeMapping[key]);
  });
  return unescapedString;
};

export const TranslationUtils = {
  addTranslationParametersGroupsLabels,
  addTranslationParametersLabels,
  changeLanguage,
  getParametersGroupTranslationKey,
  getParameterTranslationKey,
  getParameterTooltipTranslationKey,
  getParameterEnumValueTooltipTranslationKey,
  getStringWithEscapedCharacters,
  getStringWithUnescapedCharacters,
};
