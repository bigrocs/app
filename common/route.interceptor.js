
const install = (Vue, vm) => {
	vm.$u.routeIntercept = ()=>{
		console.log(123);
	}
}

export default {
	install
}