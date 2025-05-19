/*
/// Module: list_maker
module list_maker::list_maker;
*/

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions

module list_maker::list_maker;
    use std::string::String;

public struct List has key, store {
    id: UID,
    owner: address,
    items: vector<String>
}

public fun create(ctx: &mut TxContext) {
    transfer::share_object(List {
        id: object::new(ctx),
        owner: ctx.sender(),
        items: vector[],
    });
}

public fun add(list: &mut List, item: String) {
    list.items.push_back(item)
}

public fun remove(list: &mut List, index: u64): String {
    list.items.remove(index)
}

public fun delete(list: List) {
    let List {id, owner: _, items: _} = list;
    id.delete()
}

public fun length(list: &List): u64 {
    list.items.length()
}
