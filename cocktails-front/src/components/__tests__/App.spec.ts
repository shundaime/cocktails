import { describe, it, expect } from 'vitest';

import { mount, shallowMount } from '@vue/test-utils';

import AppVue from '@/App.vue';
import Loader from '../tools/AppLoader.vue';

describe('Loader', () => {
    it('renders properly', () => {
        const wrapper = shallowMount(Loader);
        expect(wrapper.exists()).toBe(true);
    });
});

describe('App', () => {
    it('renders properly', async () => {
        const wrapper = mount(AppVue);
        expect(wrapper.exists()).toBe(true);
    });
});
