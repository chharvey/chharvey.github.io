package chh.util;

/**
  * Utility class containing commonly used fields and methods used in many programs.
  * @author Christopher H. Harvey <chrisharvey2pi@gmail.com>
  * @version 2010.06.21
  */
public final class Computer {
    /** Creates a new Computer object. */ private Computer() {}

    /**
      * Waits for {@code t} milliseconds before proceeding.
      * @param t the number of milliseconds for which execution pauses.
      */
    public static void pause(int t) {
        try {
            Thread.sleep(t);
        } catch (InterruptedException e) {
            //e.printStackTrace();
        }
    }

    /**
      * Clears the output console.
      */
    public static void clearConsole() {
        java.lang.System.out.print("\f");
    }
}
