import {
  isComposerVersion,
  isFormattedDate,
  isMetric,
  withRegex,
} from '../test-validators.js'
import { ServiceTester } from '../tester.js'

export const t = new ServiceTester({
  id: 'factorio-mod-portal',
  title: 'Factorio Mod Portal',
})

const multipleVersions = withRegex(/^([+]?\d*\.\d+)(-)([+]?\d*\.\d+)$/)

t.create('Latest Version (rso-mod, valid)')
  .get('/latest-version/rso-mod.json')
  .expectBadge({ label: 'latest version', message: isComposerVersion })

t.create('Latest Version (mod not found)')
  .get('/latest-version/mod-that-doesnt-exist.json')
  .expectBadge({ label: 'latest version', message: 'mod not found' })

t.create('Factorio Versions (rso-mod, valid)')
  .get('/factorio-version/rso-mod.json')
  .expectBadge({ label: 'factorio version', message: multipleVersions })

t.create('Factorio Versions (mod not found)')
  .get('/factorio-version/mod-that-doesnt-exist.json')
  .expectBadge({ label: 'factorio version', message: 'mod not found' })

t.create('Last Updated (rso-mod, valid)')
  .get('/last-updated/rso-mod.json')
  .expectBadge({ label: 'last updated', message: isFormattedDate })

t.create('Last Updated (mod not found)')
  .get('/last-updated/mod-that-doesnt-exist.json')
  .expectBadge({ label: 'last updated', message: 'mod not found' })

t.create('Downloads (rso-mod, valid)')
  .get('/downloads/rso-mod.json')
  .expectBadge({ label: 'downloads', message: isMetric })

t.create('Downloads (mod not found)')
  .get('/downloads/mod-that-doesnt-exist.json')
  .expectBadge({ label: 'downloads', message: 'mod not found' })
