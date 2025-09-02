import FilterMenu from "./FilterMenu";
function ChallengeFilter({
  challengeStatusFilter,
  transactionStatusFilter,
  handleChallengeStatusFilter,
  handleTransactionStatusFilter,
}) {
  const options1 = ["Todos los retos", "Nuevos retos", "Retos por vencer"];
  const options2 = ["Todos los retos", "Completados", "No Completados"];
  const optionKey1 = ["TODO", "NUEVO", "POR_TERMINAR"];
  const optionKey2 = ["TODO", "COMPLETADO", "NO_COMPLETADO"];
  return (
    <>
      <div className="challenges-filter-PopUpContainer">
        <div className="challenges-filter-PopUpDisplay">
          <div className="challenges-filter">
            <FilterMenu
              onValueChange={(e) => handleChallengeStatusFilter(e)}
              title={"Vigencia"}
              options={options1}
              selectedValue={challengeStatusFilter}
              optionKey={optionKey1}
            ></FilterMenu>
            <div
              style={{ zIndex: 0, opacity: "0.3", width: "100%" }}
              className="Divider"
            ></div>
            <FilterMenu
              onValueChange={(e) => handleTransactionStatusFilter(e)}
              title={"Estado"}
              options={options2}
              selectedValue={transactionStatusFilter}
              optionKey={optionKey2}
            ></FilterMenu>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChallengeFilter;
