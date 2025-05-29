import { Picker } from "@react-native-picker/picker";

function ChallengeFilter({challengeStatusFilter, transactionStatusFilter, handleChallengeStatusFilter, handleTransactionStatusFitler}) {
    return (
    <>
        <div className="challenges-filter">

            <p className="challenges-filter-title">Filtrar por vigencia</p>
            <Picker className="challenges-filter-picker"

                selectedValue={challengeStatusFilter}
                onValueChange={(itemValue, itemIndex) => {
                    handleChallengeStatusFilter(itemValue);
                }}
            >
                <Picker.Item label="Todos los retos" value="TODO" />
                <Picker.Item label="Nuevos retos" value="NUEVO" />
                <Picker.Item label="Retos por vencer" value="POR_TERMINAR" />
            </Picker>

                <div style={{width: "100%"}} className="Divider"></div>
            <p className="challenges-filter-title">Filtrar por estado del reto</p>
            <Picker className="challenges-filter-picker"

                selectedValue={transactionStatusFilter}
                onValueChange={(itemValue, itemIndex) => {
                    handleTransactionStatusFitler(itemValue);
                }}
            >
                <Picker.Item label="Todos los retos" value="TODO" />
                <Picker.Item label="No completados" value="NUEVO" />
                <Picker.Item label="Completados" value="POR_TERMINAR" />
            </Picker>
        </div>
    </>
  );
}

export default ChallengeFilter;