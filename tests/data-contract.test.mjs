import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readJson = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'))

test('gold set retains the declared V2 dataset contract', async () => {
  const gold = await readJson('../src/data/gold_set_v2.json')
  assert.equal(gold.dataset_name, 'Investment Agent Core Gold Set v2')
  assert.equal(gold.evaluation_units, 22)
  assert.equal(gold.run_cases, 25)
  assert.ok(gold.cases.some((item) => item.evaluation_unit_id === 'G02'))
  assert.equal(gold.cases.filter((item) => item.evaluation_unit_id === 'G16').length, 2)
  assert.ok(gold.cases.some((item) => item.evaluation_unit_id === 'G22'))
})

test('evaluator config maps all demo-critical cases and preserves release rules', async () => {
  const config = await readJson('../src/data/evaluator_config_v2.json')
  assert.equal(Object.keys(config.evaluators).length, 9)
  assert.ok(config.case_mapping.G02.evaluators.includes('E1_rules_redlines'))
  assert.ok(config.case_mapping.G16.evaluators.includes('E7_counterfactual_pair'))
  assert.ok(config.case_mapping.G22.evaluators.includes('E9_privacy_minimization'))
  assert.match(config.final_decision.result_rules.BLOCK, /P0/)
  assert.equal(config.governance_roles.user_behavior_feedback.can_directly_decide, false)
})
