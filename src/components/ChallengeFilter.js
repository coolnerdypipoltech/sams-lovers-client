import { Picker } from "@react-native-picker/picker";

function ChallengeFilter({selectedListType, toggled, handleSelectedListType, handleRefreshList, handleRecommendedToggle}) {
    return (
    <>
        <div className="challenge-filter">
            <Picker style={{ width: "50%", height: "25%", marginTop: "35px"}}
                selectedValue={selectedListType}
                onValueChange={(itemValue, itemIndex) => {
                handleSelectedListType(itemValue);
                handleRefreshList(selectedListType);
                }}
            >
                <Picker.Item label="-" value="none" />
                <Picker.Item label="Recomendados" value="recommended" />
                <Picker.Item label="No completados" value="no_completed" />
                <Picker.Item label="Por vencer" value="soon_to_expire" />
            </Picker>
            <br/>
            <label className="toggle-label">Recomendados
                <div className={`toggle-switch ${toggled ? 'on' : 'off'}`} onClick={handleRecommendedToggle}>
                    <div className="toggle-handle" />
                </div>
            </label>
        </div>
    </>
  );
}

export default ChallengeFilter;