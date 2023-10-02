import { test } from '@socketsupply/tapzero'
import { signal, effect, computed } from '../src/index.js'

test('signal + subscription', async t => {
    t.plan(2)
    const counter = signal(0)
    let count = 0

    effect(() => {
        const n = counter.value
        t.equal(n, count, 'should get the initial value')
        count++
    })

    counter.value = 1

    // need this so test doesn't end before all our assertions
    return Promise.resolve()
})

test('signal + computed', async t => {
    const counter = signal(1)

    const x2 = computed(() => {
        return (counter.value * 2)
    })

    counter.value = 2

    effect(() => {
        t.equal(x2.value, 4)
    })
})
