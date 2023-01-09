import { createStore } from 'vuex';
import city from './modules/city';

const store = createStore({
    modules: {
        city,
    }
});

export default store;
