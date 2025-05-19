// /*
// #[test_only]
// module list_maker::list_maker_tests;
// // uncomment this line to import the module
// // use list_maker::list_maker;
//
// const ENotImplemented: u64 = 0;
//
// #[test]
// fun test_list_maker() {
//     // pass
// }
//
// #[test, expected_failure(abort_code = ::list_maker::list_maker_tests::ENotImplemented)]
// fun test_list_maker_fail() {
//     abort ENotImplemented
// }
// */
// #[test_only]
// module list_maker::list_maker_test;
// use std::string;
// use list_maker::list_maker;
//     use std::string::String;
//     use list_maker::list_maker::List;
//
//
// public fun create_test(ctx: &mut TxContext): List {
//     list_maker::create(ctx)
// }
//
// public fun test_add() {
//     // create new list
//     let mut list = create_test(&mut TxContext::default());
//
//     // add item to the list
//     add(&mut list, String::from("Hello, world!"));  // Add a string to the list
//
//     list_maker::add(&mut list, String::from(item));
//     assert!(list_maker::length(&list) == 1u64, 0);
//     // check that item has been added to the list
// }
