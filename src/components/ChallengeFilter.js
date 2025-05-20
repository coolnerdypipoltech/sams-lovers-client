import { Picker } from "@react-native-picker/picker";

function ChallengeFilter({endDateFilterType, statusFilterType, handleEndDateFilterType, handleStatusFilterType}) {
    return (
    <>
        <div className="challenges-filter">
            <p className="challenge-filter-title">Vigencia</p>
            <Picker className="challenge-filter-picker"
                selectedValue={endDateFilterType}
                onValueChange={(itemValue, itemIndex) => {
                    handleEndDateFilterType(itemValue);
                }}
            >
                <Picker.Item label="Todos los retos" value="all" />
                <Picker.Item label="Nuevos retos" value="new" />
                <Picker.Item label="Retos por vencer" value="soon_to_expire" />
            </Picker>
            <br/>
            <p className="challenge-filter-title">Estado</p>
            <Picker className="challenge-filter-picker"
                selectedValue={statusFilterType}
                onValueChange={(itemValue, itemIndex) => {
                    handleStatusFilterType(itemValue);
                }}
            >
                <Picker.Item label="Todos los retos" value="all" />
                <Picker.Item label="No completados" value="no_completed" />
                <Picker.Item label="Completados" value="completed" />
            </Picker>
        </div>
    </>
  );
}

export default ChallengeFilter;