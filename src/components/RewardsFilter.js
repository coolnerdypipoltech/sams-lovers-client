import FilterMenu from "./FilterMenu";
function ChallengeFilter({ rewardsStatusFilter, handleRewardsStatusFilter }) {
  const options = ["Todos las recompensas", "Obtenidas", "No obtenidas"];
  const optionKey = ["TODO", "OBTENIDO", "NO_OBTENIDO"];
  return (
    <>
      <div className="challenges-filter-PopUpContainer">
        <div className="challenges-filter-PopUpDisplay">
          <div className="challenges-filter">
            <FilterMenu
              onValueChange={(e) => handleRewardsStatusFilter(e)}
              title={"Estado"}
              options={options}
              selectedValue={rewardsStatusFilter}
              optionKey={optionKey}
            ></FilterMenu>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChallengeFilter;
