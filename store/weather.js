export const state = () => ({
  activeCityId: null,
});

export const mutations = {
  setActiveCityId(state, cityId) {
    state.activeCityId = cityId;
  },
};
