class TEST_LOCALE {
    DECIMAL_SEP; // string
    NEG_PRE; // string
    GROUP_SEP; // string
    G_SIZE; // number
    NAN_SYM; // string
    POS_INFINITY_SYM; // string
    NEG_INFINITY_SYM; // string
}



/** Some tests copied from: https://github.com/flavorjones/flexible-js-formatting/blob/master/numbers/number-test.html */

/**
 * # means a number can be in that position
 * 0-9 means to force a number (with default of number provided) into that position
 *
 *
 * At most 3 conditions. (Unless using [] conditions)
 *   1st: positive condition. 2nd: negative condition; 3rd: zero condition
 *
 *
 * Left-of-decimal must have a 0
 */
describe('number-extension', () => {
    [
        { format: '1;2;3;4;', input: 123, message: 'has >3 semi-colons' },
        { format: null, input: 123, message: 'is null' },
        { format: undefined, input: 123, message: 'is undefined' },
        { format: 1, input: 123, message: 'is as number' }
    ].forEach(({ format, input, message }) => {
        it(`should throw error if format ${message}`, () => {
            let result;

            try {
                expect(input.toFormattedString(format)).toThrow()
            } catch (e) {
                result = true;
            }

            expect(result).toEqual(true);
        });
    });

    /** Basic formatting */
    [
        /**
         * Base cases
         */
        { format: '$0', input: 1234567.89, output: '$1234568' },
        { format: '74832743829423', input: 1234567.89, output: '74832743829423' },
        { format: '!()32', input: 1234567.89, output: '!()32' },
        { format: '1.2', input: 1234567.89, output: '1.2' },
        { format: '1,2,3,4', input: 1234567.89, output: '1,2,3,4' },
        {format: '???.0', input: 5, output: '  5.0' },

        /**
         * Funny Numbers
         */
        { format: '', input: NaN, output: 'NaN' },
        { format: '', input: +Infinity, output: 'Infinity' },
        { format: '', input: -Infinity, output: '-Infinity' },

        /**
         * Simples formats
         */
        {format: '', input: 4, output: '4' },
        {format: '', input: -1, output: '-1' },
        {format: '00', input: 4, output: '04' },
        {format: '0', input: 4, output: '4' },
        { format: '-0', input: 4, output: '-4' },
        {format: '#', input: 4, output: '4' },
        {format: '#0', input: 4, output: '4' },
        {format: '##', input: 4, output: '4' },
        {format: '0.0', input: 4, output: '4.0' },
        {format: '0,0', input: 4, output: '04' },
        {format: '0.#', input: 4, output: '4.0' },
        {format: '0.000', input: 4, output: '4.000' },
        {format: '0', input: 4.5, output: '5' },
        {format: '0.0', input: 4.5, output: '4.5' },
        {format: '0.00', input: 4.5, output: '4.50' },
        {format: '.0', input: 4.5, output: '4.5' },
        {format: '0.00', input: 4.55, output: '4.55' },
        {format: '0.0', input: 4.55, output: '4.6' },
        {format: '0.0#0', input: 4.55, output: '4.550' },
        {format: '0', input: 1000, output: '1000' },
        {format: '0,0', input: 1000, output: '1,000' },
        {format: '0,#', input: 1000, output: '1,000' },
        {format: '0,0.0', input: 1000, output: '1,000.0' },
        {format: '00000.00', input: 1000, output: '01000.00' },
        {format: '0,###0.00', input: 1000, output: '01,000.00' },
        {format: '000', input: -1, output: '-001' },
        {format: '###', input: -1, output: '-1' },
        {format: '0', input: -1.44, output: '-1' },
        {format: '0', input: -1.5, output: '-2' },
        {format: '#,#.00', input: -100000, output: '-100,000.00' },
        {format: '#,#.00', input: 100000, output: '100,000.00' },
        {format: '#,#.00', input: -1, output: '-1.00' },
        {format: '#,#.00', input: 1, output: '1.00' },
        {format: '0.00000000000000', input: .00000000000008, output: '0.00000000000008' },
        {format: '0;0.0;0.000', input: 5, output: '5' },
        {format: '0;0.0;0.000', input: -5, output: '5.0' },
        {format: '0;(0.0);0.000', input: -5, output: '(5.0)' },
        {format: '0;0.0;0.000', input: 0, output: '0.000' },

        /**
         * Weird formats
         */
        { format: '$#M', input: 1234567.89, output: '$1234568M' },
        { format: '#-', input: 1234567.89, output: '1234568-' },
        {format: 'asdf', input: 1000, output: 'asdf' },
        {format: 'abc1.0cde', input: 1, output: 'abc11.0cde' },
        {format: 'abc1.0cde', input: -1, output: 'abc1-1.0cde' },
        {format: 'abc10.0cde', input: 1, output: 'abc11.0cde' },
        {format: 'abc10.0cde', input: -1, output: 'abc1-1.0cde' },
        {format: 'one;two', input: 5, output: 'one' },
        {format: 'one;two', input: 0, output: 'one' },
        {format: 'one;two', input: -5, output: 'two' },
        {format: 'one;two;three', input: 5, output: 'one' },
        {format: 'one;two;three', input: -5, output: 'two' },
        {format: 'one;two;three', input: 0, output: 'three' },
        {format: '0,0,, million', input: 12831242485472, output: '12,831,242 million' },

        /**
         * Locale testing
         *
         * DECIMAL_SEP, NEG_PRE, GROUP_SEP, G_SIZE, NaNstring, posInfinity, negInfinity
         */
        // TODO:

        /**
         * Comma scaling
         *
         * For each comma after leading character, divide value by 1000
         */
        { format: '#,', input: 1234567891234567.89, output: '1234567891235' },
        { format: '#,,', input: 1234567891234567.89, output: '1234567891' },
        { format: '#,,,', input: 1234567891234567.89, output: '1234568' },
        { format: '#,,,,', input: 1234567891234567.89, output: '1235' },
        { format: '#,,,,,', input: 1234567891234567.89, output: '1' },
        { format: '0,', input: 1234567891234567.89, output: '1234567891235' },
        { format: '0,,', input: 1234567891234567.89, output: '1234567891' },
        { format: '0,,,', input: 1234567891234567.89, output: '1234568' },
        { format: '0,,,,', input: 1234567891234567.89, output: '1235' },
        { format: '0,,,,,', input: 1234567891234567.89, output: '1' },

        /**
         * Percentages
         *
         * Multiple number by 100
         */
        { format: '0%', input: 1234567, output: '123456700%' },
        { format: '0%', input: 1234567.8, output: '123456780%' },
        { format: '0%', input: 1234567.89, output: '123456789%' },
        { format: '0%', input: 123456.789, output: '12345679%' },
        { format: '0%', input: 12345.6789, output: '1234568%' },
        { format: '0%', input: 1234.56789, output: '123457%' },
        { format: '#%', input: 1234567, output: '123456700%' },
        { format: '#%', input: 1234567.8, output: '123456780%' },
        { format: '#%', input: 1234567.89, output: '123456789%' },
        { format: '#%', input: 123456.789, output: '12345679%' },
        { format: '#%', input: 12345.6789, output: '1234568%' },
        { format: '#%', input: 1234.56789, output: '123457%' },
        { format: '####%', input: 1, output: '100%' },
        { format: '0000%', input: 1, output: '0100%' },
        { format: '####0%', input: 1, output: '100%' },
        { format: '0.##%;(0.##%);0%', input: 11, output: '1100.00%' },
        { format: '0.##%;(0.##%);0%', input: 1, output: '100.00%' },
        { format: '0.##%;(0.##%);0%', input: 0.1, output: '10.00%' },
        { format: '0.##%;(0.##%);0%', input: 0.12, output: '12.00%' },
        { format: '0.##%;(0.##%);0%', input: 0.123, output: '12.30%' },
        { format: '0.##%;(0.##%);0%', input: 0.1234, output: '12.34%' },
        { format: '0.##%;(0.##%);0%', input: 0.12345, output: '12.35%' },
        { format: '0.##%;(0.##%);0%', input: -11, output: '(1100.00%)' },
        { format: '0.##%;(0.##%);0%', input: -1, output: '(100.00%)' },
        { format: '0.##%;(0.##%);0%', input: -0.1, output: '(10.00%)' },
        { format: '0.##%;(0.##%);0%', input: -0.12, output: '(12.00%)' },
        { format: '0.##%;(0.##%);0%', input: -0.123, output: '(12.30%)' },
        { format: '0.##%;(0.##%);0%', input: -0.1234, output: '(12.34%)' },
        { format: '0.##%;(0.##%);0%', input: -0.12345, output: '(12.35%)' },

        /**
         * Scientific notation
         *
         * #####e#####
         * #####e+#####
         * #####e-#####
         */
        // different formats
        { format: '0e', input: 0.1, output: '0e' },
        { format: '0e', input: 1234567, output: '1234567e' },
        { format: '0e0', input: 1234567, output: '123456e7' },
        { format: '0e#', input: 1234567, output: '123456e7' },
        { format: '0e##', input: 1234567, output: '12345e67' },
        { format: '0e###', input: 1234567, output: '1234e567' },
        { format: '0e##', input: 1234567.89, output: '12345e68' },
        {format: '0.0E+00', input: 5.55, output: '5.6E+00' },
        {format: '0.0E+00', input: 1000000, output: '1.0E+06' },
        {format: '0.00e00', input: .1, output: '1.00e-01' },
        {format: '0.00E00', input: .1, output: '1.00E-01' },
        {format: '0.00E00', input: 1, output: '1.00E00' },
        {format: '0.00e00', input: 1, output: '1.00e00' },
        {format: '0.00e+00', input: 1, output: '1.00e+00' },
        {format: '0.00E+00', input: 1, output: '1.00E+00' },
        {format: '0.00E+00', input: -1, output: '-1.00E+00' },
        // length
        { format: '0e#', input: 123456, output: '12345e6' },
        { format: '0e#', input: 12345, output: '1234e5' },
        { format: '0e#', input: 1234, output: '123e4' },
        { format: '0e#', input: 123, output: '12e3' },
        { format: '0e#', input: 12, output: '1e2' },
        { format: '0e#', input: 1, output: '0e1' },
        { format: '0e#', input: 0.5, output: '0e1' },
        { format: '0e#', input: 0.1, output: '0e0' },
        // +
        { format: '0e+#', input: 123456, output: '12345e+6' },
        { format: '0e+#', input: 12345, output: '1234e+5' },
        { format: '0e+#', input: 1234, output: '123e+4' },
        { format: '0e+#', input: 123, output: '12e+3' },
        { format: '0e+#', input: 12, output: '1e+2' },
        { format: '0e+#', input: 1, output: '0e+1' },
        { format: '0e+#', input: 0.5, output: '0e+1' },
        { format: '0e+#', input: 0.1, output: '0e+0' },
        // -
        { format: '0e-#', input: 123456, output: '12345e-6' },
        { format: '0e-#', input: 12345, output: '1234e-5' },
        { format: '0e-#', input: 1234, output: '123e-4' },
        { format: '0e-#', input: 123, output: '12e-3' },
        { format: '0e-#', input: 12, output: '1e-2' },
        { format: '0e-#', input: 1, output: '0e-1' },
        { format: '0e-#', input: 0.5, output: '0e-1' },
        { format: '0e-#', input: 0.1, output: '0e-0' },
        // toFixedSpecial
        { format: ',,,,,,.#', input: 1.23e20, output: '123.0' },
        { format: '##.##', input: 100e-1, output: '10.00' },
        { format: '##.##', input: 1e+20, output: '100000000000000000000.00' },
        { format: '##.##', input: 1e+21, output: '1000000000000000000000.00' },
        // toFixedSpecial with val < 0
        { format: ',,,,,,.#', input: -1.23e20, output: '-123.0' },
        { format: '##.##', input: -100e-1, output: '-10.00' },
        { format: '##.##', input: -1e+20, output: '-100000000000000000000.00' },
        { format: '##.##', input: -1e+21, output: '-100000000000000000000.00' },
        // toScientific case m1
        { format: '##.0e0', input: 0.1, output: '1.0e-1' },
        { format: '##.0e0', input: -0.1, output: '-1.0e-1' },
        // toScientific case m2
        { format: '##.e-0', input: 1, output: '.e10' },
        { format: '##.e-0', input: -1, output: '-.e10' },
        { format: '##.e-0', input: 0.1, output: '1.e-1' },
        { format: '##.e-0', input: -0.1, output: '-1.e-1' },

        /**
         * Edit literal
         */
        { format: '#,###,##0.##', input: 1234567.89, output: '1,234,567.89' },
        { format: '#,###,##0.##', input: 1000000.89, output: '1,000,000.89' },
        { format: '#,###,##0.##', input: 0.89, output: '0.89' },
        { format: '#,###,##0.##', input: 1234.89123, output: '1,234.89' },
        { format: '#,###,##0.##', input: 1234.89123, output: '1,234.89' },
        { format: '#,###,##0.##', input: 1234, output: '1,234.00' },

        /**
         * Custom Conditions
         */
        // non-decimal
        { format: '[>3]$#;[<3]K#;[=3]E#', input: 2, output: 'K2' },
        { format: '[>3]$#;[<3]K#;[=3]E#', input: 3, output: 'E3' },
        { format: '[>3]$#;[<3]K#;[=3]E#', input: 4, output: '$4' },
        // decimal numbers w/o decimal format
        { format: '[>3.3]$#;[<=3.3]K#;', input: 3.3, output: 'K3' },
        { format: '[>3.3]$#;[<=3.3]K#', input: 3.34, output: '$3' },
        // decimal numbers w decimal format
        { format: '[>3.3]$#.#;[<=3.3]K#.#;', input: 3.3, output: 'K3.3' },
        { format: '[>3.3]$#.#;[<=3.3]K#.#', input: 3.34, output: '$3.3' },
        { format: '[>3.3]$#.#;[<=3.3]K#.#', input: 3.35, output: '$3.4' },
        // one non-conditional rules
        { format: '[>3.3]$#;$#.#', input: 3.3, output: '$3.3' },
        { format: '[>3.3]$#;$#.#', input: 3.35, output: '$3' },

        /**
         * Display literal
         */
        // format 1
        { format: '$#,###,##0;($#,###,##0);$0', input: 8765431234567.89, output: '$8,765,431,234,568' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 765431234567.89, output: '$765,431,234,568' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 65431234567.89, output: '$65,431,234,568' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 5431234567.89, output: '$5,431,234,568' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 431234567.89, output: '$431,234,568' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 31234567.89, output: '$31,234,568' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 1234567.89, output: '$1,234,568' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 1234.89123, output: '$1,235' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 1000000.50, output: '$1,000,001' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 1000000.49, output: '$1,000,000' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 234567.89, output: '$234,568' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 34567.89, output: '$34,568' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 4567.89, output: '$4,568' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 567.89, output: '$568' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 67.89, output: '$68' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 7.89, output: '$8' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 0.89, output: '$1' },
        { format: '$#,###,##0;($#,###,##0);$0', input: 1234, output: '$1,234' },
        // format 2
        { format: '$#,###,##0;($#,###,##0);$0', input: -67891234567.89, output: '($67,891,234,568)' },
        { format: '$#,###,##0;($#,###,##0);$0', input: -7891234567.89, output: '($7,891,234,568)' },
        { format: '$#,###,##0;($#,###,##0);$0', input: -891234567.89, output: '($891,234,568)' },
        { format: '$#,###,##0;($#,###,##0);$0', input: -91234567.89, output: '($91,234,568)' },
        { format: '$#,###,##0;($#,###,##0);$0', input: -1234567.89, output: '($1,234,568)' },
        { format: '$#,###,##0;($#,###,##0);$0', input: -1000000.89, output: '($1,000,001)' },
        { format: '$#,###,##0;($#,###,##0);$0', input: -1000000.50, output: '($1,000,001)' },
        { format: '$#,###,##0;($#,###,##0);$0', input: -1000000.49, output: '($1,000,000)' },
        { format: '$#,###,##0;($#,###,##0);$0', input: -1234.89123, output: '($1,235)' },
        { format: '$#,###,##0;($#,###,##0);$0', input: -1234, output: '($1,234)' },
        // format 3 (I think these hit it?)
        { format: '$#,###,##0;($#,###,##0);$0', input: 0, output: '$0' },

        /**
         * Edit thousands
         *
         * max 4 leading digits, min&max 4 decimals
         * */
        // 2 decimal spots
        { format: '0,.####', input: 1234567.89, output: '1234.5679' },
        { format: '0,.####', input: 234567.89, output: '234.5679' },
        { format: '0,.####', input: 34567.89, output: '34.5679' },
        { format: '0,.####', input: 4567.89, output: '4.5679' },
        { format: '0,.####', input: 567.89, output: '0.5679' },
        { format: '0,.####', input: 67.89, output: '0.0679' },
        { format: '0,.####', input: 7.89, output: '0.0079' },
        { format: '0,.####', input: 0.89, output: '0.0009' },
        { format: '0,.####', input: 0.09, output: '0.0001' },
        { format: '0,.####', input: 0.009, output: '0.0000' },
        // 3 decimal spots
        { format: '0,.####', input: 1234567.891, output: '1234.5679' },
        { format: '0,.####', input: 234567.891, output: '234.5679' },
        // 4 decimal spots
        { format: '0,.####', input: 1234567.8912, output: '1234.5679' },
        // 5 decimal spots
        { format: '0,.####', input: 1234567.89123, output: '1234.5679' },

        /**
         * Display thousands
         */
        // format 1
        { format: '$#,##0,;($#,##0,);$0', input: 1111111111111.89, output: '$1,111,111,111' },
        { format: '$#,##0,;($#,##0,);$0', input: 111111111111.89, output: '$111,111,111' },
        { format: '$#,##0,;($#,##0,);$0', input: 11111111111.89, output: '$11,111,111' },
        { format: '$#,##0,;($#,##0,);$0', input: 1111111111.89, output: '$1,111,111' },
        { format: '$#,##0,;($#,##0,);$0', input: 111111111.89, output: '$111,111' },
        { format: '$#,##0,;($#,##0,);$0', input: 11111111.89, output: '$11,111' },
        { format: '$#,##0,;($#,##0,);$0', input: 1111111.89, output: '$1,111' },
        { format: '$#,##0,;($#,##0,);$0', input: 1234567.89, output: '$1,235' },
        { format: '$#,##0,;($#,##0,);$0', input: 1000500.89, output: '$1,001' },
        { format: '$#,##0,;($#,##0,);$0', input: 1000490.89, output: '$1,000' },
        { format: '$#,##0,;($#,##0,);$0', input: 1234567.89123, output: '$1,235' },
        { format: '$#,##0,;($#,##0,);$0', input: 123456.89123, output: '$123' },
        { format: '$#,##0,;($#,##0,);$0', input: 12345.89123, output: '$12' },
        { format: '$#,##0,;($#,##0,);$0', input: 1234.89123, output: '$1' },
        { format: '$#,##0,;($#,##0,);$0', input: 234.89123, output: '$0' },
        { format: '$#,##0,;($#,##0,);$0', input: 34.89123, output: '$0' },
        { format: '$#,##0,;($#,##0,);$0', input: 5, output: '$0' },
        { format: '$#,##0,;($#,##0,);$0', input: 0.5, output: '$0' },
        // format 2
        { format: '$#,##0,;($#,##0,);$0', input: -1111111111111.89, output: '($1,111,111,111)' },
        { format: '$#,##0,;($#,##0,);$0', input: -111111111111.89, output: '($111,111,111)' },
        { format: '$#,##0,;($#,##0,);$0', input: -11111111111.89, output: '($11,111,111)' },
        { format: '$#,##0,;($#,##0,);$0', input: -1111111111.89, output: '($1,111,111)' },
        { format: '$#,##0,;($#,##0,);$0', input: -111111111.89, output: '($111,111)' },
        { format: '$#,##0,;($#,##0,);$0', input: -11111111.89, output: '($11,111)' },
        { format: '$#,##0,;($#,##0,);$0', input: -1111111.89, output: '($1,111)' },
        { format: '$#,##0,;($#,##0,);$0', input: -1234567.89, output: '($1,235)' },
        { format: '$#,##0,;($#,##0,);$0', input: -1000500.89, output: '($1,001)' },
        { format: '$#,##0,;($#,##0,);$0', input: -1000490.89, output: '($1,000)' },
        { format: '$#,##0,;($#,##0,);$0', input: -1234567.89123, output: '($1,235)' },
        { format: '$#,##0,;($#,##0,);$0', input: -123456.89123, output: '($123)' },
        { format: '$#,##0,;($#,##0,);$0', input: -12345.89123, output: '($12)' },
        { format: '$#,##0,;($#,##0,);$0', input: -1234.89123, output: '($1)' },
        { format: '$#,##0,;($#,##0,);$0', input: -234.89123, output: '($0)' },
        { format: '$#,##0,;($#,##0,);$0', input: -34.89123, output: '($0)' },
        { format: '$#,##0,;($#,##0,);$0', input: -5, output: '($0)' },
        { format: '$#,##0,;($#,##0,);$0', input: -0.5, output: '($0)' },

        /**
         * Edit Millions
         *
         * Millions up to 7 decimal places
         */
        { format: '0,,.#######', input: 1000000000000, output: '1000000.0000000' },
        { format: '0,,.#######', input: 100000000000, output: '100000.0000000' },
        { format: '0,,.#######', input: 10000000000, output: '10000.0000000' },
        { format: '0,,.#######', input: 1000000000, output: '1000.0000000' },
        { format: '0,,.#######', input: 100000000, output: '100.0000000' },
        { format: '0,,.#######', input: 10000000, output: '10.0000000' },
        { format: '0,,.#######', input: 1000000, output: '1.0000000' },
        { format: '0,,.#######', input: 100000, output: '0.1000000' },
        { format: '0,,.#######', input: 10000, output: '0.0100000' },
        { format: '0,,.#######', input: 1000, output: '0.0010000' },
        { format: '0,,.#######', input: 100, output: '0.0001000' },
        { format: '0,,.#######', input: 10, output: '0.0000100' },
        { format: '0,,.#######', input: 1, output: '0.0000010' },
        { format: '0,,.#######', input: 0.1, output: '0.0000001' },
        { format: '0,,.#######', input: 0.05, output: '0.0000001' },
        { format: '0,,.#######', input: 0.04, output: '0.0000000' },
        { format: '0,,.#######', input: 0.01, output: '0.0000000' },
        { format: '0,,.#######', input: -1000000000000, output: '-1000000.0000000' },
        { format: '0,,.#######', input: -100000000000, output: '-100000.0000000' },
        { format: '0,,.#######', input: -10000000000, output: '-10000.0000000' },
        { format: '0,,.#######', input: -1000000000, output: '-1000.0000000' },
        { format: '0,,.#######', input: -100000000, output: '-100.0000000' },
        { format: '0,,.#######', input: -10000000, output: '-10.0000000' },
        { format: '0,,.#######', input: -1000000, output: '-1.0000000' },
        { format: '0,,.#######', input: -100000, output: '-0.1000000' },
        { format: '0,,.#######', input: -10000, output: '-0.0100000' },
        { format: '0,,.#######', input: -1000, output: '-0.0010000' },
        { format: '0,,.#######', input: -100, output: '-0.0001000' },
        { format: '0,,.#######', input: -10, output: '-0.0000100' },
        { format: '0,,.#######', input: -1, output: '-0.0000010' },
        { format: '0,,.#######', input: -0.1, output: '-0.0000001' },
        { format: '0,,.#######', input: -0.05, output: '-0.0000001' },
        { format: '0,,.#######', input: -0.04, output: '-0.0000000' },
        { format: '0,,.#######', input: -0.01, output: '-0.0000000' },

        /**
         * Display Millions
         */
        { format: '$#,##0,,,;($#,##0,,);$0', input: 1000000000000000000, output: '$1,000,000,000' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 1000000000000000000, output: '$1,000,000,000' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 100000000000000000, output: '$100,000,000' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 10000000000000000, output: '$10,000,000' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 1000000000000000, output: '$1,000,000' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 100000000000000, output: '$100,000' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 10000000000000, output: '$10,000' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 1000000000000, output: '$1,000' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 100000000000, output: '$100' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 10000000000, output: '$10' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 1500000000, output: '$2' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 1000000000, output: '$1' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 500000000, output: '$1' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 499999999, output: '$0' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 100000000, output: '$0' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 10000000, output: '$0' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 1000000, output: '$0' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 100000, output: '$0' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 10000, output: '$0' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 1000, output: '$0' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 100, output: '$0' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 10, output: '$0' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 1, output: '$0' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 0.1, output: '$0' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: 0.01, output: '$0' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -1000000000000000, output: '($1,000,000,000)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -100000000000000, output: '($100,000,000)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -10000000000000, output: '($10,000,000)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -1000000000000, output: '($1,000,000)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -100000000000, output: '($100,000)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -10000000000, output: '($10,000)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -1000000000, output: '($1,000)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -100000000, output: '($100)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -10000000, output: '($10)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -1000000, output: '($1)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -100000, output: '($0)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -10000, output: '($0)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -1000, output: '($0)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -100, output: '($0)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -10, output: '($0)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -1, output: '($0)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -0.1, output: '($0)' },
        { format: '$#,##0,,,;($#,##0,,);$0', input: -0.01, output: '($0)' },
    ].forEach(({input, format, output}) => {
        it(`should adhere to format: ${format}`, () => {
            expect(input.toFormattedString(format)).toEqual(output)
        });
    });
})
