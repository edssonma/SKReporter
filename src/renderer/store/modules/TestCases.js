const getDefaultState = () => {
    return {
        classes: [],
        testCases: [],
        executions: [],
        executionInfo: null,
        testCase: null,
        executionDate: null,
        //page2
        className: null,
        methods: [],
        testSuiteClasses: [],
        include: false,
        select: false
    }
}

const state = getDefaultState();

const getters = {
    activeExecutions: state => {
        return state.executions;
    },
    activeExecutionInfo: state => {
        return state.executionInfo
    },
    activeTestCase: state => {
        return state.testCase;
    },
    activeExecutionDate: state => {
        return state.executionDate;
    },
    arrayClasses: state => {
        return state.classes;
    },
    activeClass: state => {
        return state.className;
    },
    activeMethods: state => {
        return state.methods;
    },
    activeTestSuiteClasses: state => {
        return state.testSuiteClasses;
    },
    selectionByInclude: state => {
        return state.include;
    },
    selectionBySelect: state => {
        return state.select;
    }
}

const mutations = {
    SET_ACTIVE_EXECUTIONS(state, executions) {
        state.executions = executions;
    },
    SET_ACTIVE_EXECUTION_INFO(state, info) {
        state.executionInfo = info;
    },
    SET_ACTIVE_TEST_CASE(state, testCase) {
        state.testCase = testCase;
    },
    SET_ACTIVE_EXECUTION_DATE(state, date) {
        state.executionDate = date;
    },
    SET_ACTIVE_CLASS(state, className) {
        state.className = null;
        state.className = className;
    },
    SET_ACTIVE_METHODS(state, className) {
        var i = state.classes.findIndex(element => element.className == className);
        if(i != -1){
            state.methods = state.classes[i].methods;
        }else{
            state.methods = [];
        }
    },
    SET_ACTIVE_TEST_SUITE_CLASSES(state, object) {
        if (object.mode == "clean") {
            state.testSuiteClasses = [];
        }
        else {
            var i = state.classes.findIndex(element =>
                element.className == state.className);
            var j = state.testSuiteClasses.findIndex(element =>
                element.class == state.className);

            if (object.mode == "auto") {
                if (i !== -1) {
                    state.classes[i].methods.forEach((element, index) => {
                        element.status = "include";
                    });
                    if (j !== -1) {
                        state.testSuiteClasses[j].methods = state.classes[i].methods;
                    } else {
                        state.testSuiteClasses.push({
                            class: state.className,
                            methods: state.classes[i].methods
                        });
                    }
                }
            }
            if (object.mode == "manual") {
                if (i !== -1) {
                    state.classes[i].methods.forEach((element, index) => {
                        if (element.testCaseName == object.method) {
                            element.status = object.status;
                        }
                    });
                }
                if (j !== -1) {
                    state.testSuiteClasses[j].methods = state.classes[i].methods;
                } else {
                    state.testSuiteClasses.push({
                        class: state.className,
                        methods: state.classes[i].methods
                    });
                }
            }
            //activamos los metodos en el front
            state.methods = state.classes[i].methods;
        }
    },
    REMOVE_CLASS_FROM_TEST_SUITE(state, className) {
        var i = state.testSuiteClasses.findIndex(element => element.class == className);
        if (i !== -1) {
            state.testSuiteClasses.splice(i, 1);
        }
    },
    SET_CLASSES(state, classes) {
        state.classes = classes;
    },
    SET_SELECTION_TYPE(state, selectionType) {
        var i = state.classes.findIndex(element => element.className == state.className);
        state.classes[i].selectionType = selectionType;
    },
    SET_SELECTION(state, selection) {
        switch (selection) {
            case "includeAll":
                state.include = true;
                state.select = false;
                break;
            case "select":
                state.select = true;
                state.include = false;
                break;
            case "none":
                state.select = false;
                state.include = false;
                break;
        }
    },
    SET_CLASS_METHODS(state, object) {
        var i = state.classes.findIndex(element => element.className == object.className);
        state.classes[i].methods = object.methods;
    }
}

const actions = {
    setActiveExecutions({ commit }, executions) {
        commit('SET_ACTIVE_EXECUTIONS', executions);
    },
    setActiveExecutionInfo({ commit }, info) {
        commit('SET_ACTIVE_EXECUTION_INFO', info);
    },
    setActiveTestCase({ commit }, testCase) {
        commit('SET_ACTIVE_TEST_CASE', testCase);
    },
    setActiveExecutionDate({ commit }, date) {
        commit('SET_ACTIVE_EXECUTION_DATE', date);
    },
    setActiveClass({ commit }, className) {
        commit('SET_ACTIVE_CLASS', className);
    },
    setClasses({ commit }, classes) {
        commit('SET_CLASSES', classes);
    },
    setActiveMethods({ commit }, className) {
        commit('SET_ACTIVE_METHODS', className);
    },
    setActiveTestSuiteClasses({ commit }, object) {
        commit('SET_ACTIVE_TEST_SUITE_CLASSES', object);
    },
    removeClassFromTestSuite({ commit }, className) {
        commit('REMOVE_CLASS_FROM_TEST_SUITE', className);
    },
    setSelectionType({ commit }, selectionType) {
        commit('SET_SELECTION_TYPE', selectionType);
    },
    setSelection({ commit }, selection) {
        commit('SET_SELECTION', selection);
    },
    setClassMethods({ commit }, object) {
        commit('SET_CLASS_METHODS', object);
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
