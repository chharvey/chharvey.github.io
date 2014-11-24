package chh.math.set;

/**
 *
 * @author Christopher H. Harvey <chrisharvey2pi@gmail.com>
 */
public final class Driver {
    
    private Driver() { }
    
	private static String openPair(Set x) {
		String s = x + " is empty? " + x.isEmpty();
		if (!x.isEmpty()) {
			Pair y = (Pair) x; // DOWNCASTING really???
			s += "\n    " + openPair(y.element1);
			s += y.element1.equals(y.element2) ? "" : "\n    " + openPair(y.element2);
		}
		return s;
	}
	private static String compare(Set x, Set y) {
		String s = "";
		s += openPair(x) + "\n" + openPair(y);
		s += "\n" + x + (y.includes(x) ? " is a subset of " : " is not a subset of ") + y;
		s += "\n" + y + (x.includes(y) ? " is a subset of " : " is not a subset of ") + x;
		s += "\ntherefore " + x + (x.equals(y) ? " equals " : " does not equal ") + y;
		return s;
	}
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        EmptySet e = new EmptySet();
		Tuple o = new Tuple();
		Tuple a = new Tuple(e);
		Tuple b = new Tuple(e,e);
		Tuple b2 = new Tuple(e,a);
		Tuple b2flip = new Tuple(a,e);
		
		System.out.println(new EmptySet());
		System.out.println("0-tuples");
		System.out.println(new Tuple());
		System.out.println("1-tuples");
		System.out.println(new Tuple(new EmptySet()));
		System.out.println(new Tuple(new Tuple()));
		System.out.println("2-tuples");
		System.out.println(new Tuple(new EmptySet(), new EmptySet()));
		System.out.println(new Tuple(new EmptySet(), new Tuple()));
		System.out.println(new Tuple(new Tuple(), new EmptySet()));
		System.out.println(new Tuple(new Tuple(), new Tuple()));
		
		
    }

}
