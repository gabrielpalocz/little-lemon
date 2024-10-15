import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <ScrollView horizontal={true} style={styles.filtersContainer}>
      <View style={styles.horizontalContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onChange(index);
            }}
            style={{
              flex: 1 / sections.length,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 16,
              backgroundColor: selections[index] ? '#495E57' : '#EDEFEE',
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 25
            }}>
            <View>
              <Text style={{ color: selections[index] ? 'white' : '#495E57', fontWeight: 'bold' }}>
                {section}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    padding: 10,
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc' 
  },
  horizontalContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10
  }
});

export default Filters;
