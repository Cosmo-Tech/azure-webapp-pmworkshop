// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useCurrentScenarioData, useScenarioListData } from '../../state/hooks/ScenarioHooks';
import { usePowerBIInfo } from '../../state/hooks/PowerBIHooks';
import { useWorkspaceChartsLogInWithUserCredentials } from '../../state/hooks/WorkspaceHooks';
import { useDownloadLogsFile } from '../../hooks/ScenarioRunHooks';

import { getReportLabels } from './labels';

export const useCurrentScenarioPowerBiReport = () => {
  const { t, i18n } = useTranslation();

  const currentScenarioData = useCurrentScenarioData();
  const scenarioListData = useScenarioListData();
  const reports = usePowerBIInfo();
  const logInWithUserCredentials = useWorkspaceChartsLogInWithUserCredentials();
  const downloadLogsFile = useDownloadLogsFile();

  const reportLabels = useMemo(() => getReportLabels(t), [t]);
  const language = useMemo(() => i18n.language, [i18n.language]);

  const visibleScenarios = useMemo(
    () =>
      scenarioListData.map((scenario) => ({
        id: scenario.id,
        runId: scenario.lastRun?.scenarioRunId,
        csmSimulationRun: scenario.lastRun?.csmSimulationRun,
      })),
    [scenarioListData]
  );

  return {
    currentScenarioData,
    visibleScenarios,
    reportLabels,
    reports,
    language,
    downloadLogsFile,
    logInWithUserCredentials,
  };
};
