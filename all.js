const app = new Vue({
    el:'#app',
    data: {
        data:[],
        currentPage: 0,
        locations: [],
        currentLocation:''
    },
    methods: {
        getUniqueList() {
            const locations = new Set(); // 使用 ES6 中的 set() 取出唯一值
            const vm = this;
            vm.data.forEach((item, i) => {
                locations.add(item.Zone)
            })
            console.log(locations);
            vm.locations = Array.from(locations);
        }
    },
    computed: {
        filterData() {
            const vm = this;            
            // 先過濾
            let items = [];
            if(vm.currentLocation !== '') {
                items = vm.data.filter((item, i) => {
                    return item.Zone == vm.currentLocation // 回傳為true的值
                })
            } else {
                items = vm.data;
            }

            const newData = [];
            items.forEach((item, i) => {
                if(i % 10 === 0){
                    newData.push([]);
                }
                const page = parseInt(i/10);
                newData[page].push(item);
            });
            console.log(newData);
            return newData;
        }
    },
    created() {
        const vm = this;
        axios.get('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97')
        .then(function (resopnse){
            console.log(resopnse);
            vm.data = resopnse.data.result.records;
            console.log(vm.data);
            vm.getUniqueList();
        })
        .catch(function(error){
            console.log(error);
        });
        
    },
});