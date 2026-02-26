"use client";

import { useState } from "react";
import {
  Upload,
  Search,
  MoreHorizontal,
  Download,
  Edit3,
  Trash2,
  FolderPlus,
} from "lucide-react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import Header from "../header";
import ParticipantSidebar from "./sidebar";
import ParticipantProfileHeader from "./profileHeader";

/**
 * @typedef {Object} FileItem
 * @property {string} id
 * @property {string} name
 * @property {string} uploader
 * @property {string} uploadDate
 * @property {string} size
 * @property {'jpg' | 'pdf' | 'docx'} type
 */

const initialFiles = [
  {
    id: "20695706",
    name: "Consent 1.jpg",
    uploader: "Samantha Alcorn",
    uploadDate: "4:55 pm, 28 Nov 2025",
    size: "2.68 MB",
    type: "jpg",
  },
  {
    id: "20695705",
    name: "Case History 1.jpg",
    uploader: "Samantha Alcorn",
    uploadDate: "4:55 pm, 28 Nov 2025",
    size: "2.63 MB",
    type: "jpg",
  },
  {
    id: "20695703",
    name: "Case History 2.jpg",
    uploader: "Samantha Alcorn",
    uploadDate: "4:55 pm, 28 Nov 2025",
    size: "2.41 MB",
    type: "jpg",
  },
  {
    id: "20695707",
    name: "Consent 2.jpg",
    uploader: "Samantha Alcorn",
    uploadDate: "4:55 pm, 28 Nov 2025",
    size: "2.62 MB",
    type: "jpg",
  },
  {
    id: "20695702",
    name: "Case History 3.jpg",
    uploader: "Samantha Alcorn",
    uploadDate: "4:55 pm, 28 Nov 2025",
    size: "1.89 MB",
    type: "jpg",
  },
  {
    id: "20695577",
    name: "NDIS Outcomes report 24Nov25 Paige Speech Pathology.pdf",
    uploader: "Samantha Alcorn",
    uploadDate: "4:15 pm, 28 Nov 2025",
    size: "267 KB",
    type: "pdf",
  },
  {
    id: "14878469",
    name: "Toileting visual.jpg",
    uploader: "Samantha Alcorn",
    uploadDate: "10:19 am, 4 Aug 2025",
    size: "2.21 MB",
    type: "jpg",
  },
  {
    id: "14878292",
    name: "Who, Doing what, Where Cards.docx",
    uploader: "Samantha Alcorn",
    uploadDate: "10:12 am, 4 Aug 2025",
    size: "---",
    type: "docx",
  },
  {
    id: "14878268",
    name: "Illustration Scenes .pdf",
    uploader: "Samantha Alcorn",
    uploadDate: "10:11 am, 4 Aug 2025",
    size: "2.35 MB",
    type: "pdf",
  },
  {
    id: "14877948",
    name: "Colourful semantics Map.pdf",
    uploader: "Samantha Alcorn",
    uploadDate: "9:58 am, 4 Aug 2025",
    size: "410 KB",
    type: "pdf",
  },
  {
    id: "14877947",
    name: "Who doing.docx",
    uploader: "Samantha Alcorn",
    uploadDate: "9:58 am, 4 Aug 2025",
    size: "159 KB",
    type: "docx",
  },
  {
    id: "13982330",
    name: "Turn taking ALD 12.pdf",
    uploader: "Samantha Alcorn",
    uploadDate: "7:43 am, 21 Jul 2025",
    size: "95.7 KB",
    type: "pdf",
  },
  {
    id: "13982309",
    name: "General Interactive 20 cell ALD.pdf",
    uploader: "Samantha Alcorn",
    uploadDate: "7:41 am, 21 Jul 2025",
    size: "107 KB",
    type: "pdf",
  },
  {
    id: "13982298",
    name: "General Interactive 20 cell final ALD.pdf",
    uploader: "Samantha Alcorn",
    uploadDate: "7:41 am, 21 Jul 2025",
    size: "282 KB",
    type: "pdf",
  },
  {
    id: "13517744",
    name: "My Day V2.pdf",
    uploader: "Samantha Alcorn",
    uploadDate: "6:59 am, 8 Jul 2025",
    size: "2.23 MB",
    type: "pdf",
  },
  {
    id: "13510999",
    name: "Goals Paige June2025.docx",
    uploader: "Samantha Alcorn",
    uploadDate: "12:16 pm, 7 Jul 2025",
    size: "17.7 KB",
    type: "docx",
  },
  {
    id: "12988757",
    name: "Paige_Sabud_Lu_531841270__Plan_Approval.pdf",
    uploader: "Manjinder Rattu",
    uploadDate: "3:45 pm, 22 Jun 2025",
    size: "142 KB",
    type: "pdf",
  },
  {
    id: "12988740",
    name: "Paige_Lu_-_Service_Agreement.pdf",
    uploader: "Manjinder Rattu",
    uploadDate: "3:41 pm, 22 Jun 2025",
    size: "259 KB",
    type: "pdf",
  },
];

export default function ParticipantFilesPage() {
  const [files, setFiles] = useState(initialFiles);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Drag & Drop reordering
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    setIsDragging(false);

    const sourceId = e.dataTransfer.getData("text/plain");
    if (sourceId === targetId) return;

    const sourceIndex = files.findIndex((f) => f.id === sourceId);
    const targetIndex = files.findIndex((f) => f.id === targetId);

    const newFiles = [...files];
    const [movedFile] = newFiles.splice(sourceIndex, 1);
    newFiles.splice(targetIndex, 0, movedFile);

    setFiles(newFiles);
  };

  // Upload simulation
  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = (e) => {
      const uploadedFiles = Array.from(e.target.files).map((file, i) => ({
        id: `upload-${Date.now()}-${i}`,
        name: file.name,
        uploader: "You",
        uploadDate: "Just now",
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        type: file.name.split(".").pop()?.toLowerCase() || "file",
      }));
      setFiles([...uploadedFiles, ...files]);
    };
    input.click();
  };

  // New Folder
  const createNewFolder = () => {
    if (!newFolderName.trim()) return;
    const newFolder = {
      id: `folder-${Date.now()}`,
      name: newFolderName,
      uploader: "You",
      uploadDate: "Just now",
      size: "—",
      type: "jpg", // folder icon will be handled separately
    };
    setFiles([newFolder, ...files]);
    setNewFolderName("");
    setShowNewFolderModal(false);
  };

  // Actions
  const handleAction = (action, fileId) => {
    const file = files.find((f) => f.id === fileId);
    if (!file) return;

    if (action === "Download") {
      alert(`Downloading: ${file.name}`);
    } else if (action === "Rename") {
      const newName = prompt("New name:", file.name);
      if (newName) {
        setFiles(
          files.map((f) => (f.id === fileId ? { ...f, name: newName } : f)),
        );
      }
    } else if (action === "Delete") {
      if (confirm(`Delete ${file.name}?`)) {
        setFiles(files.filter((f) => f.id !== fileId));
      }
    } else {
      alert(`${action} ${file.name}`);
    }
  };

  const getFileIcon = (type, name) => {
    if (name.toLowerCase().includes("folder")) return "📁";
    if (type === "pdf") return "📕";
    if (type === "docx") return "📘";
    return "📄";
  };

  // const router = useRouter();
  // const { id } = router.query; // Assuming participantId is the dynamic route param
  const id = 1; // Hardcoded for demonstration; replace with dynamic param as needed

  return (
    <div className="h-screen bg-gray-50">
      {/* HEADER - identical to previous pages */}
      <Header activeKey="Participants" />

            <ParticipantProfileHeader
              participantName="Paige (Paige) Lu"
              participantId={id}
            />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <ParticipantSidebar participantId={id} defaultLabel="Files" />

        {/* MAIN FILES AREA */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sub-header */}
          <div className="bg-white border-b px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold">Files</span>
              <span className="text-gray-400">/</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowNewFolderModal(true)}
                className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-medium"
              >
                <FolderPlus className="w-4 h-4" /> New folder
              </button>

              <button
                onClick={handleUpload}
                className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-medium"
              >
                <Upload className="w-4 h-4" /> Upload
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="px-8 py-4 bg-white border-b">
            <div className="max-w-md relative">
              <input
                type="text"
                placeholder="Search for file name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-5 py-3 border border-gray-300 rounded-2xl focus:border-emerald-500 focus:outline-none"
              />
              <Search className="absolute left-5 top-4 text-gray-400" />
            </div>
          </div>

          {/* Drop Zone + Table */}
          <div
            className={`flex-1 p-8 overflow-auto transition-all ${isDragging ? "bg-emerald-50 border-2 border-dashed border-emerald-400" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              alert("Files dropped! (In real app this would upload)");
            }}
          >
            <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
              <table className="w-full min-w-[1100px]">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                    <th className="py-5 px-8 w-1/2">Name</th>
                    <th className="py-5 px-6">Uploader</th>
                    <th className="py-5 px-6">Upload date</th>
                    <th className="py-5 px-6">File size</th>
                    <th className="py-5 px-6 w-20 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map((file) => (
                    <tr
                      key={file.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, file.id)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, file.id)}
                      onDragEnd={() => setIsDragging(false)}
                      className="border-b hover:bg-gray-50 cursor-move group"
                    >
                      <td className="py-5 px-8 flex items-center gap-4">
                        <span className="text-2xl">
                          {getFileIcon(file.type, file.name)}
                        </span>
                        <span className="font-medium text-gray-900">
                          {file.name}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-gray-600">
                        {file.uploader}
                      </td>
                      <td className="py-5 px-6 text-gray-600">
                        {file.uploadDate}
                      </td>
                      <td className="py-5 px-6 text-gray-600">{file.size}</td>
                      <td className="py-5 px-6 text-center">
                        <Menu as="div" className="relative inline-block">
                          <Menu.Button className="text-3xl text-gray-400 hover:text-gray-600">
                            <MoreHorizontal />
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl py-2 border z-50">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() =>
                                      handleAction("Download", file.id)
                                    }
                                    className={`${active ? "bg-gray-100" : ""} flex items-center gap-3 w-full px-5 py-3 text-left text-sm`}
                                  >
                                    <Download className="w-4 h-4" /> Download
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() =>
                                      handleAction("Rename", file.id)
                                    }
                                    className={`${active ? "bg-gray-100" : ""} flex items-center gap-3 w-full px-5 py-3 text-left text-sm`}
                                  >
                                    <Edit3 className="w-4 h-4" /> Rename
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() =>
                                      handleAction("Delete", file.id)
                                    }
                                    className={`${active ? "bg-gray-100 text-red-600" : ""} flex items-center gap-3 w-full px-5 py-3 text-left text-sm`}
                                  >
                                    <Trash2 className="w-4 h-4" /> Delete
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredFiles.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                No files found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Folder Modal */}
      <Dialog
        open={showNewFolderModal}
        onClose={() => setShowNewFolderModal(false)}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
      >
        <div className="bg-white rounded-3xl p-8 w-96">
          <h3 className="text-xl font-semibold mb-6">Create new folder</h3>
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder name"
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-lg focus:outline-none focus:border-emerald-500"
            autoFocus
          />
          <div className="flex gap-3 mt-8">
            <button
              onClick={() => setShowNewFolderModal(false)}
              className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium"
            >
              Cancel
            </button>
            <button
              onClick={createNewFolder}
              className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-medium"
            >
              Create folder
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
