import { useEffect, useState } from 'react';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [mailToLink, setMailToLink] = useState(''); // Store mailto link

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // Build the mailto link with message, subject, etc.
    const mailLink = `mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`;
    setMailToLink(mailLink); // Set the mailto link to trigger later
    setShowModal(true); // Show confirmation modal
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
    window.location.href = mailToLink; // Trigger mailto link after modal closes
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          {/* Send Message Button */}
          <button
            onClick={handleSendMessage}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message
          </button>

          {/* Modal for confirmation */}
          {showModal && (
            <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center'>
              <div className='bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-sm'>
                <div className='flex justify-end'>
                  <button onClick={() => setShowModal(false)} className='text-gray-500 hover:text-gray-700 text-xl'>
                    &times;
                  </button>
                </div>
                <p className='text-center text-lg font-semibold'>
                  Are you sure you want to send this message to {landlord.username}?
                </p>
                <div className='flex justify-center gap-4 mt-4'>
                  <button
                    onClick={closeModal}
                    className='bg-green-600 text-white p-2 rounded-lg hover:bg-green-700'
                  >
                    Yes, Send
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className='bg-red-600 text-white p-2 rounded-lg hover:bg-red-700'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
