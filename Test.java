class Test {
    static void fun(int n) {
        if (n < 0) {
            return;
        }
        System.out.println(n);
        fun(n + 1);
        n = n + 1 - 1;
    }

    public static void main(String[] args) {
        fun(15);
    }
}