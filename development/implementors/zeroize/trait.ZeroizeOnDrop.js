(function() {var implementors = {
"chacha20":[["impl <a class=\"trait\" href=\"zeroize/trait.ZeroizeOnDrop.html\" title=\"trait zeroize::ZeroizeOnDrop\">ZeroizeOnDrop</a> for <a class=\"struct\" href=\"chacha20/struct.ChaCha20LegacyCore.html\" title=\"struct chacha20::ChaCha20LegacyCore\">ChaCha20LegacyCore</a>"],["impl&lt;R:&nbsp;<a class=\"trait\" href=\"typenum/marker_traits/trait.Unsigned.html\" title=\"trait typenum::marker_traits::Unsigned\">Unsigned</a>&gt; <a class=\"trait\" href=\"zeroize/trait.ZeroizeOnDrop.html\" title=\"trait zeroize::ZeroizeOnDrop\">ZeroizeOnDrop</a> for <a class=\"struct\" href=\"chacha20/struct.XChaChaCore.html\" title=\"struct chacha20::XChaChaCore\">XChaChaCore</a>&lt;R&gt;"],["impl&lt;R:&nbsp;<a class=\"trait\" href=\"typenum/marker_traits/trait.Unsigned.html\" title=\"trait typenum::marker_traits::Unsigned\">Unsigned</a>&gt; <a class=\"trait\" href=\"zeroize/trait.ZeroizeOnDrop.html\" title=\"trait zeroize::ZeroizeOnDrop\">ZeroizeOnDrop</a> for <a class=\"struct\" href=\"chacha20/struct.ChaChaCore.html\" title=\"struct chacha20::ChaChaCore\">ChaChaCore</a>&lt;R&gt;"]],
"chacha20poly1305":[["impl&lt;C, N:&nbsp;<a class=\"trait\" href=\"generic_array/trait.ArrayLength.html\" title=\"trait generic_array::ArrayLength\">ArrayLength</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.68.2/std/primitive.u8.html\">u8</a>&gt;&gt; <a class=\"trait\" href=\"zeroize/trait.ZeroizeOnDrop.html\" title=\"trait zeroize::ZeroizeOnDrop\">ZeroizeOnDrop</a> for <a class=\"struct\" href=\"chacha20poly1305/struct.ChaChaPoly1305.html\" title=\"struct chacha20poly1305::ChaChaPoly1305\">ChaChaPoly1305</a>&lt;C, N&gt;"]],
"cipher":[["impl&lt;T&gt; <a class=\"trait\" href=\"zeroize/trait.ZeroizeOnDrop.html\" title=\"trait zeroize::ZeroizeOnDrop\">ZeroizeOnDrop</a> for <a class=\"struct\" href=\"cipher/struct.StreamCipherCoreWrapper.html\" title=\"struct cipher::StreamCipherCoreWrapper\">StreamCipherCoreWrapper</a>&lt;T&gt;<span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: <a class=\"trait\" href=\"cipher/trait.BlockSizeUser.html\" title=\"trait cipher::BlockSizeUser\">BlockSizeUser</a> + <a class=\"trait\" href=\"zeroize/trait.ZeroizeOnDrop.html\" title=\"trait zeroize::ZeroizeOnDrop\">ZeroizeOnDrop</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;T::<a class=\"associatedtype\" href=\"cipher/trait.BlockSizeUser.html#associatedtype.BlockSize\" title=\"type cipher::BlockSizeUser::BlockSize\">BlockSize</a>: <a class=\"trait\" href=\"typenum/type_operators/trait.IsLess.html\" title=\"trait typenum::type_operators::IsLess\">IsLess</a>&lt;<a class=\"type\" href=\"cipher/consts/type.U256.html\" title=\"type cipher::consts::U256\">U256</a>&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"type\" href=\"typenum/operator_aliases/type.Le.html\" title=\"type typenum::operator_aliases::Le\">Le</a>&lt;T::<a class=\"associatedtype\" href=\"cipher/trait.BlockSizeUser.html#associatedtype.BlockSize\" title=\"type cipher::BlockSizeUser::BlockSize\">BlockSize</a>, <a class=\"type\" href=\"cipher/consts/type.U256.html\" title=\"type cipher::consts::U256\">U256</a>&gt;: <a class=\"trait\" href=\"typenum/marker_traits/trait.NonZero.html\" title=\"trait typenum::marker_traits::NonZero\">NonZero</a>,</span>"]],
"salsa20":[["impl&lt;R:&nbsp;<a class=\"trait\" href=\"typenum/marker_traits/trait.Unsigned.html\" title=\"trait typenum::marker_traits::Unsigned\">Unsigned</a>&gt; <a class=\"trait\" href=\"zeroize/trait.ZeroizeOnDrop.html\" title=\"trait zeroize::ZeroizeOnDrop\">ZeroizeOnDrop</a> for <a class=\"struct\" href=\"salsa20/struct.XSalsaCore.html\" title=\"struct salsa20::XSalsaCore\">XSalsaCore</a>&lt;R&gt;"],["impl&lt;R:&nbsp;<a class=\"trait\" href=\"typenum/marker_traits/trait.Unsigned.html\" title=\"trait typenum::marker_traits::Unsigned\">Unsigned</a>&gt; <a class=\"trait\" href=\"zeroize/trait.ZeroizeOnDrop.html\" title=\"trait zeroize::ZeroizeOnDrop\">ZeroizeOnDrop</a> for <a class=\"struct\" href=\"salsa20/struct.SalsaCore.html\" title=\"struct salsa20::SalsaCore\">SalsaCore</a>&lt;R&gt;"]],
"zeroize":[]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()