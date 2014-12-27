package chh.math.set;
public abstract class Set {

    /**
     * Removes duplicates from an array of Set objects.
     * And returns a new array with {@code null} objects replaced for the duplicates.
     * @param oldArray
     * @return a new array with duplicates removed and replaced with {@code null} objects
     */
    private static Set[] removeDuplicates(Set[] oldArray) {
        int cells = 0; // the number of needed cells in the new array
        for (int i = 0; i < oldArray.length; i++) {
            /* Loops through old array and nullifies all non-null Set objects that are equal to the current Set object. */
            if (oldArray[i] != null) {
                cells++;
                for (int j = i + 1; j < oldArray.length; j++) {
                    if (oldArray[i].equals(oldArray[j])) oldArray[j] = null;
                }
            }
        }
        Set[] newArray = new Set[cells]; // the new array without any duplicates or empty spaces
        int nCell = 0; // an index for the new array
        for (int i = 0; i < oldArray.length; i++) {
            /* loops through old array and copies entries to new array only if they are non-null */
            if (oldArray[i] != null) {
                newArray[nCell] = oldArray[i];
                nCell++;
            }
        }
        return newArray;
    }
}
