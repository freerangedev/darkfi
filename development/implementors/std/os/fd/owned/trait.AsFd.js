(function() {var implementors = {
"async_fs":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.68.2/std/os/fd/owned/trait.AsFd.html\" title=\"trait std::os::fd::owned::AsFd\">AsFd</a> for <a class=\"struct\" href=\"async_fs/struct.File.html\" title=\"struct async_fs::File\">File</a>"]],
"async_io":[["impl&lt;T:&nbsp;<a class=\"trait\" href=\"https://doc.rust-lang.org/1.68.2/std/os/fd/owned/trait.AsFd.html\" title=\"trait std::os::fd::owned::AsFd\">AsFd</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.68.2/std/os/fd/owned/trait.AsFd.html\" title=\"trait std::os::fd::owned::AsFd\">AsFd</a> for <a class=\"struct\" href=\"async_io/struct.Async.html\" title=\"struct async_io::Async\">Async</a>&lt;T&gt;"]],
"async_net":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.68.2/std/os/fd/owned/trait.AsFd.html\" title=\"trait std::os::fd::owned::AsFd\">AsFd</a> for <a class=\"struct\" href=\"async_net/unix/struct.UnixListener.html\" title=\"struct async_net::unix::UnixListener\">UnixListener</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.68.2/std/os/fd/owned/trait.AsFd.html\" title=\"trait std::os::fd::owned::AsFd\">AsFd</a> for <a class=\"struct\" href=\"async_net/unix/struct.UnixStream.html\" title=\"struct async_net::unix::UnixStream\">UnixStream</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.68.2/std/os/fd/owned/trait.AsFd.html\" title=\"trait std::os::fd::owned::AsFd\">AsFd</a> for <a class=\"struct\" href=\"async_net/struct.TcpListener.html\" title=\"struct async_net::TcpListener\">TcpListener</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.68.2/std/os/fd/owned/trait.AsFd.html\" title=\"trait std::os::fd::owned::AsFd\">AsFd</a> for <a class=\"struct\" href=\"async_net/struct.TcpStream.html\" title=\"struct async_net::TcpStream\">TcpStream</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.68.2/std/os/fd/owned/trait.AsFd.html\" title=\"trait std::os::fd::owned::AsFd\">AsFd</a> for <a class=\"struct\" href=\"async_net/struct.UdpSocket.html\" title=\"struct async_net::UdpSocket\">UdpSocket</a>"]],
"async_process":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.68.2/std/os/fd/owned/trait.AsFd.html\" title=\"trait std::os::fd::owned::AsFd\">AsFd</a> for <a class=\"struct\" href=\"async_process/struct.ChildStdin.html\" title=\"struct async_process::ChildStdin\">ChildStdin</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.68.2/std/os/fd/owned/trait.AsFd.html\" title=\"trait std::os::fd::owned::AsFd\">AsFd</a> for <a class=\"struct\" href=\"async_process/struct.ChildStdout.html\" title=\"struct async_process::ChildStdout\">ChildStdout</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.68.2/std/os/fd/owned/trait.AsFd.html\" title=\"trait std::os::fd::owned::AsFd\">AsFd</a> for <a class=\"struct\" href=\"async_process/struct.ChildStderr.html\" title=\"struct async_process::ChildStderr\">ChildStderr</a>"]],
"io_lifetimes":[],
"polling":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.68.2/std/os/fd/owned/trait.AsFd.html\" title=\"trait std::os::fd::owned::AsFd\">AsFd</a> for <a class=\"struct\" href=\"polling/struct.Poller.html\" title=\"struct polling::Poller\">Poller</a>"]],
"rustix":[["impl&lt;'context, T:&nbsp;<a class=\"trait\" href=\"rustix/fd/trait.AsFd.html\" title=\"trait rustix::fd::AsFd\">AsFd</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.68.2/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"struct\" href=\"rustix/fd/struct.OwnedFd.html\" title=\"struct rustix::fd::OwnedFd\">OwnedFd</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.68.2/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"rustix/fd/struct.OwnedFd.html\" title=\"struct rustix::fd::OwnedFd\">OwnedFd</a>&gt;&gt; <a class=\"trait\" href=\"rustix/fd/trait.AsFd.html\" title=\"trait rustix::fd::AsFd\">AsFd</a> for <a class=\"struct\" href=\"rustix/io/epoll/struct.Epoll.html\" title=\"struct rustix::io::epoll::Epoll\">Epoll</a>&lt;<a class=\"struct\" href=\"rustix/io/epoll/struct.Owning.html\" title=\"struct rustix::io::epoll::Owning\">Owning</a>&lt;'context, T&gt;&gt;"],["impl&lt;'fd&gt; <a class=\"trait\" href=\"rustix/fd/trait.AsFd.html\" title=\"trait rustix::fd::AsFd\">AsFd</a> for <a class=\"struct\" href=\"rustix/io/struct.PollFd.html\" title=\"struct rustix::io::PollFd\">PollFd</a>&lt;'fd&gt;"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()