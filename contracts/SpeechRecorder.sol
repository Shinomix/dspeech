//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract SpeechRecorder {
  event SpeechRecorded(uint256 id, address indexed sender, string speech);

  using Counters for Counters.Counter;
  Counters.Counter private _messageIds;

  uint constant CONTENT_MAX_LENGTH = 256;
  uint constant PAGE_SIZE = 10;

  struct Speech {
    address sender;
    string content;
    uint256 id;
  }

  mapping(uint256 => Speech) private _speeches;

  function record(string memory content) public returns (uint256) {
    require(_isContentLengthValid(content), "content is empty or too long");

    // bump counter if message is valid
    _messageIds.increment();

    Speech memory speech = _setSpeech(
      msg.sender,
      content,
      _messageIds.current()
    );

    // store the speech in the permanent storage
    _speeches[speech.id] = speech;
    emit SpeechRecorded(speech.id, speech.sender, speech.content);

    return speech.id;
  }

  function get(uint256 id) public view returns (Speech memory) {
    return _speeches[id];
  }

  function getPage(uint256 startFrom) public view returns (Speech[] memory) {
    uint256 maxIndex = _messageIds.current();
    uint i = 0;

    uint pageSize = startFrom + PAGE_SIZE > maxIndex ? maxIndex - startFrom : PAGE_SIZE;
    Speech[] memory result = new Speech[](pageSize);

    while (i < PAGE_SIZE && startFrom + i < maxIndex) {
      result[i] = _speeches[startFrom + i + 1]; // counter starts from 1
      i++;
    }

    return result;
  }

  function _setSpeech(address sender, string memory content, uint256 id) private pure returns (Speech memory s) {
    s.sender = sender;
    s.content = content;
    s.id = id;

    return s;
  }

  function _isContentLengthValid(string memory content) private pure returns (bool) {
    uint length = bytes(content).length;

    return length > 0 && length < CONTENT_MAX_LENGTH;
  }
}
