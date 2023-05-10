(function() {var implementors = {
"bitvec":[["impl&lt;T, O&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"bitvec/boxed/struct.BitBox.html\" title=\"struct bitvec::boxed::BitBox\">BitBox</a>&lt;T, O&gt;<span class=\"where fmt-newline\">where\n    T: <a class=\"trait\" href=\"bitvec/store/trait.BitStore.html\" title=\"trait bitvec::store::BitStore\">BitStore</a>,\n    O: <a class=\"trait\" href=\"bitvec/order/trait.BitOrder.html\" title=\"trait bitvec::order::BitOrder\">BitOrder</a>,</span>"],["impl&lt;A, O&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"bitvec/array/struct.BitArray.html\" title=\"struct bitvec::array::BitArray\">BitArray</a>&lt;A, O&gt;<span class=\"where fmt-newline\">where\n    A: <a class=\"trait\" href=\"bitvec/view/trait.BitViewSized.html\" title=\"trait bitvec::view::BitViewSized\">BitViewSized</a>,\n    O: <a class=\"trait\" href=\"bitvec/order/trait.BitOrder.html\" title=\"trait bitvec::order::BitOrder\">BitOrder</a>,</span>"],["impl&lt;M, T, O&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"bitvec/ptr/struct.BitRef.html\" title=\"struct bitvec::ptr::BitRef\">BitRef</a>&lt;'_, M, T, O&gt;<span class=\"where fmt-newline\">where\n    M: <a class=\"trait\" href=\"bitvec/ptr/trait.Mutability.html\" title=\"trait bitvec::ptr::Mutability\">Mutability</a>,\n    T: <a class=\"trait\" href=\"bitvec/store/trait.BitStore.html\" title=\"trait bitvec::store::BitStore\">BitStore</a>,\n    O: <a class=\"trait\" href=\"bitvec/order/trait.BitOrder.html\" title=\"trait bitvec::order::BitOrder\">BitOrder</a>,</span>"],["impl&lt;R&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"bitvec/index/struct.BitMask.html\" title=\"struct bitvec::index::BitMask\">BitMask</a>&lt;R&gt;<span class=\"where fmt-newline\">where\n    R: <a class=\"trait\" href=\"bitvec/mem/trait.BitRegister.html\" title=\"trait bitvec::mem::BitRegister\">BitRegister</a>,</span>"],["impl&lt;T, O&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"bitvec/vec/struct.BitVec.html\" title=\"struct bitvec::vec::BitVec\">BitVec</a>&lt;T, O&gt;<span class=\"where fmt-newline\">where\n    T: <a class=\"trait\" href=\"bitvec/store/trait.BitStore.html\" title=\"trait bitvec::store::BitStore\">BitStore</a>,\n    O: <a class=\"trait\" href=\"bitvec/order/trait.BitOrder.html\" title=\"trait bitvec::order::BitOrder\">BitOrder</a>,</span>"],["impl&lt;'a, T, O&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for &amp;'a mut <a class=\"struct\" href=\"bitvec/slice/struct.BitSlice.html\" title=\"struct bitvec::slice::BitSlice\">BitSlice</a>&lt;T, O&gt;<span class=\"where fmt-newline\">where\n    T: <a class=\"trait\" href=\"bitvec/store/trait.BitStore.html\" title=\"trait bitvec::store::BitStore\">BitStore</a>,\n    O: <a class=\"trait\" href=\"bitvec/order/trait.BitOrder.html\" title=\"trait bitvec::order::BitOrder\">BitOrder</a>,</span>"]],
"cranelift_codegen":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"cranelift_codegen/ir/immediates/struct.Ieee32.html\" title=\"struct cranelift_codegen::ir::immediates::Ieee32\">Ieee32</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"cranelift_codegen/ir/immediates/struct.Ieee64.html\" title=\"struct cranelift_codegen::ir::immediates::Ieee64\">Ieee64</a>"]],
"crossterm":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"crossterm/event/struct.KeyboardEnhancementFlags.html\" title=\"struct crossterm::event::KeyboardEnhancementFlags\">KeyboardEnhancementFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"crossterm/event/struct.KeyEventState.html\" title=\"struct crossterm::event::KeyEventState\">KeyEventState</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"crossterm/event/struct.KeyModifiers.html\" title=\"struct crossterm::event::KeyModifiers\">KeyModifiers</a>"]],
"dashu_int":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for &amp;<a class=\"struct\" href=\"dashu_int/struct.IBig.html\" title=\"struct dashu_int::IBig\">IBig</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"dashu_int/struct.IBig.html\" title=\"struct dashu_int::IBig\">IBig</a>"]],
"enumset":[["impl&lt;T: <a class=\"trait\" href=\"enumset/trait.EnumSetType.html\" title=\"trait enumset::EnumSetType\">EnumSetType</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"enumset/struct.EnumSet.html\" title=\"struct enumset::EnumSet\">EnumSet</a>&lt;T&gt;"]],
"mpg123_sys":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"mpg123_sys/struct.mpg123_channels.html\" title=\"struct mpg123_sys::mpg123_channels\">mpg123_channels</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"mpg123_sys/struct.mpg123_flags.html\" title=\"struct mpg123_sys::mpg123_flags\">mpg123_flags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"mpg123_sys/struct.mpg123_param_flags.html\" title=\"struct mpg123_sys::mpg123_param_flags\">mpg123_param_flags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"mpg123_sys/struct.mpg123_enc_enum.html\" title=\"struct mpg123_sys::mpg123_enc_enum\">mpg123_enc_enum</a>"]],
"nix":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"nix/sys/stat/struct.SFlag.html\" title=\"struct nix::sys::stat::SFlag\">SFlag</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"nix/fcntl/struct.RenameFlags.html\" title=\"struct nix::fcntl::RenameFlags\">RenameFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"nix/sys/statvfs/struct.FsFlags.html\" title=\"struct nix::sys::statvfs::FsFlags\">FsFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"nix/fcntl/struct.FdFlag.html\" title=\"struct nix::fcntl::FdFlag\">FdFlag</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"nix/sys/stat/struct.Mode.html\" title=\"struct nix::sys::stat::Mode\">Mode</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"nix/sys/signal/struct.SaFlags.html\" title=\"struct nix::sys::signal::SaFlags\">SaFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"nix/fcntl/struct.FallocateFlags.html\" title=\"struct nix::fcntl::FallocateFlags\">FallocateFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"nix/unistd/struct.AccessFlags.html\" title=\"struct nix::unistd::AccessFlags\">AccessFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"nix/fcntl/struct.OFlag.html\" title=\"struct nix::fcntl::OFlag\">OFlag</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"nix/fcntl/struct.SealFlag.html\" title=\"struct nix::fcntl::SealFlag\">SealFlag</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"nix/sys/signalfd/struct.SfdFlags.html\" title=\"struct nix::sys::signalfd::SfdFlags\">SfdFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"nix/sys/memfd/struct.MemFdCreateFlag.html\" title=\"struct nix::sys::memfd::MemFdCreateFlag\">MemFdCreateFlag</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"nix/fcntl/struct.AtFlags.html\" title=\"struct nix::fcntl::AtFlags\">AtFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"nix/sys/wait/struct.WaitPidFlag.html\" title=\"struct nix::sys::wait::WaitPidFlag\">WaitPidFlag</a>"]],
"num_bigint":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"num_bigint/struct.BigInt.html\" title=\"struct num_bigint::BigInt\">BigInt</a>"],["impl&lt;'a&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for &amp;'a <a class=\"struct\" href=\"num_bigint/struct.BigInt.html\" title=\"struct num_bigint::BigInt\">BigInt</a>"]],
"num_modular":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"num_modular/struct.udouble.html\" title=\"struct num_modular::udouble\">udouble</a>"]],
"region":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"region/struct.Protection.html\" title=\"struct region::Protection\">Protection</a>"]],
"rend":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.BigEndian.html\" title=\"struct rend::BigEndian\">BigEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.u64.html\">u64</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.NativeEndian.html\" title=\"struct rend::NativeEndian\">NativeEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.i32.html\">i32</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.NativeEndian.html\" title=\"struct rend::NativeEndian\">NativeEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.i16.html\">i16</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.BigEndian.html\" title=\"struct rend::BigEndian\">BigEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.i16.html\">i16</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.NativeEndian.html\" title=\"struct rend::NativeEndian\">NativeEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.u16.html\">u16</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.NativeEndian.html\" title=\"struct rend::NativeEndian\">NativeEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.u64.html\">u64</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.NativeEndian.html\" title=\"struct rend::NativeEndian\">NativeEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.i128.html\">i128</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.NativeEndian.html\" title=\"struct rend::NativeEndian\">NativeEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.i64.html\">i64</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.BigEndian.html\" title=\"struct rend::BigEndian\">BigEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.i64.html\">i64</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.BigEndian.html\" title=\"struct rend::BigEndian\">BigEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.u16.html\">u16</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.LittleEndian.html\" title=\"struct rend::LittleEndian\">LittleEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.u32.html\">u32</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.LittleEndian.html\" title=\"struct rend::LittleEndian\">LittleEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.i32.html\">i32</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.LittleEndian.html\" title=\"struct rend::LittleEndian\">LittleEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.u128.html\">u128</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.BigEndian.html\" title=\"struct rend::BigEndian\">BigEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.u128.html\">u128</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.BigEndian.html\" title=\"struct rend::BigEndian\">BigEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.u32.html\">u32</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.LittleEndian.html\" title=\"struct rend::LittleEndian\">LittleEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.i16.html\">i16</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.LittleEndian.html\" title=\"struct rend::LittleEndian\">LittleEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.u16.html\">u16</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.BigEndian.html\" title=\"struct rend::BigEndian\">BigEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.i32.html\">i32</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.NativeEndian.html\" title=\"struct rend::NativeEndian\">NativeEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.u128.html\">u128</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.LittleEndian.html\" title=\"struct rend::LittleEndian\">LittleEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.i64.html\">i64</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.LittleEndian.html\" title=\"struct rend::LittleEndian\">LittleEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.i128.html\">i128</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.BigEndian.html\" title=\"struct rend::BigEndian\">BigEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.i128.html\">i128</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.LittleEndian.html\" title=\"struct rend::LittleEndian\">LittleEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.u64.html\">u64</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rend/struct.NativeEndian.html\" title=\"struct rend::NativeEndian\">NativeEndian</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.69.0/std/primitive.u32.html\">u32</a>&gt;"]],
"rustix":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/struct.Access.html\" title=\"struct rustix::fs::Access\">Access</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/inotify/struct.CreateFlags.html\" title=\"struct rustix::fs::inotify::CreateFlags\">CreateFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/io/struct.DupFlags.html\" title=\"struct rustix::io::DupFlags\">DupFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/struct.MountFlags.html\" title=\"struct rustix::fs::MountFlags\">MountFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/struct.UnmountFlags.html\" title=\"struct rustix::fs::UnmountFlags\">UnmountFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/struct.OFlags.html\" title=\"struct rustix::fs::OFlags\">OFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/struct.RenameFlags.html\" title=\"struct rustix::fs::RenameFlags\">RenameFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/struct.AtFlags.html\" title=\"struct rustix::fs::AtFlags\">AtFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/io/struct.ReadWriteFlags.html\" title=\"struct rustix::io::ReadWriteFlags\">ReadWriteFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/struct.SealFlags.html\" title=\"struct rustix::fs::SealFlags\">SealFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/io/struct.PollFlags.html\" title=\"struct rustix::io::PollFlags\">PollFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/io/epoll/struct.EventFlags.html\" title=\"struct rustix::io::epoll::EventFlags\">EventFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/io/struct.EventfdFlags.html\" title=\"struct rustix::io::EventfdFlags\">EventfdFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/struct.ResolveFlags.html\" title=\"struct rustix::fs::ResolveFlags\">ResolveFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/struct.Mode.html\" title=\"struct rustix::fs::Mode\">Mode</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/struct.StatVfsMountFlags.html\" title=\"struct rustix::fs::StatVfsMountFlags\">StatVfsMountFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/io/epoll/struct.CreateFlags.html\" title=\"struct rustix::io::epoll::CreateFlags\">CreateFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/struct.FallocateFlags.html\" title=\"struct rustix::fs::FallocateFlags\">FallocateFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/struct.FdFlags.html\" title=\"struct rustix::fs::FdFlags\">FdFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/struct.MountPropagationFlags.html\" title=\"struct rustix::fs::MountPropagationFlags\">MountPropagationFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/inotify/struct.WatchFlags.html\" title=\"struct rustix::fs::inotify::WatchFlags\">WatchFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/struct.XattrFlags.html\" title=\"struct rustix::fs::XattrFlags\">XattrFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/struct.StatxFlags.html\" title=\"struct rustix::fs::StatxFlags\">StatxFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/io/struct.SpliceFlags.html\" title=\"struct rustix::io::SpliceFlags\">SpliceFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/io/struct.PipeFlags.html\" title=\"struct rustix::io::PipeFlags\">PipeFlags</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"rustix/fs/struct.MemfdFlags.html\" title=\"struct rustix::fs::MemfdFlags\">MemfdFlags</a>"]],
"subtle":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"subtle/struct.Choice.html\" title=\"struct subtle::Choice\">Choice</a>"]],
"tui":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"tui/widgets/struct.Borders.html\" title=\"struct tui::widgets::Borders\">Borders</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"tui/style/struct.Modifier.html\" title=\"struct tui::style::Modifier\">Modifier</a>"]],
"typenum":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"typenum/bit/struct.B1.html\" title=\"struct typenum::bit::B1\">B1</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.69.0/core/ops/bit/trait.Not.html\" title=\"trait core::ops::bit::Not\">Not</a> for <a class=\"struct\" href=\"typenum/bit/struct.B0.html\" title=\"struct typenum::bit::B0\">B0</a>"]],
"wasmer_types":[["impl <a class=\"trait\" href=\"wasmer_types/lib/std/ops/trait.Not.html\" title=\"trait wasmer_types::lib::std::ops::Not\">Not</a> for <a class=\"enum\" href=\"wasmer_types/compilation/target/enum.CpuFeature.html\" title=\"enum wasmer_types::compilation::target::CpuFeature\">CpuFeature</a>"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()