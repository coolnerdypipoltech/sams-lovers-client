import { Picker } from "@react-native-picker/picker";

function ChallengeFilter({challengeStatusFilter, transactionStatusFilter, handleChallengeStatusFilter, handleTransactionStatusFitler}) {
    return (
    <>
        <div className="challenges-filter">
            <p className="challenges-filter-title">Vigencia</p>
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
            <br/>
            <p className="challenges-filter-title">Estado</p>
            <Picker className="challenges-filter-picker"
                selectedValue={transactionStatusFilter}
                onValueChange={(itemValue, itemIndex) => {
                    handleTransactionStatusFitler(itemValue);
                }}
            >
                <Picker.Item label="Todos los retos" value="TODO" />
                <Picker.Item label="Completados" value="COMPLETADO" />
                <Picker.Item label="No completados" value="NO_COMPLETADO" />
            </Picker>
        </div>
    </>
  );
}

export default ChallengeFilter;