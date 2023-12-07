export default defineStore({
    id: 'login',
    persist: {
    // 开启持久化
        enabled: true,
        H5Storage: window?.localStorage,
        strategies: [
            {
                key: 'login',
                storage: window?.sessionStorage
            }
        ]
    },
    state: () => {
        return {
            name: '张三',
            token: 'token...'
        };
    },
    getters: {
        fullName: (state) => {
            return `${state.name}丰`;
        }
    },
    actions: {
        updateName(name: any) {
            this.name = name;
        }
    }
});
