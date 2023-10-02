import { test } from '@socketsupply/tapzero'
import { signal, effect, computed } from '../src/index.js'

test('signal + subscription smoke test', async t => {
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

test('signal + computed smoke test', async t => {
    const counter = signal(1)

    const x2 = computed(() => {
        return (counter.value * 2)
    })

    counter.value = 2

    effect(() => {
        t.equal(x2.value, 4)
    })
})

test('async computed function', async t => {
    const counter2 = signal(0)

    const x2 = computed(async () => {
        return counter2.value * 2
    })

    counter2.value = 2

    effect(() => {
        t.eqaul(x2.value, 4, 'should get an async update')
    })
})
